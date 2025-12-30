import json
from datetime import timedelta
from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncDate

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .models import CV, Feedback
from .pagination import CVPagination
from .serializers import CVSerializer
from auth_app.models import User

class CVListView(generics.ListCreateAPIView):
    serializer_class = CVSerializer
    pagination_class = CVPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CV.objects.all().order_by('id')
        else:
            return CV.objects.filter(user=user).order_by('id')

    def perform_create(self, serializer):
        data = serializer.validated_data.get('data')
        if isinstance(data, dict):
            serializer.validated_data['data'] = json.dumps(data)
        serializer.save(user=self.request.user)

class CVDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CVSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CV.objects.all()
        else:
            return CV.objects.filter(user=user)


class AdminStatsView(APIView):
    """Admin-only endpoint to get dashboard statistics"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Get current date info
        today = timezone.now().date()
        last_7_days = today - timedelta(days=7)
        
        # Load default CV data for comparison
        try:
            with open("default_cvs/cv_1.json", "r") as f:
                default_cv_data = f.read()
                # Remove whitespace for comparison if needed, or parse as JSON
                import json
                default_cv_json = json.loads(default_cv_data)
        except Exception as e:
            print(f"Error loading default CV: {e}")
            default_cv_json = {}

        # Basic counts
        total_users = User.objects.count()
        all_cvs = CV.objects.all()
        total_raw_cvs = all_cvs.count()
        
        # Calculate "Real" CVs (created new OR modified default)
        real_cvs_count = 0
        for cv in all_cvs:
            # If title is NOT "Example", it's definitely a user CV (renamed or new)
            if cv.title != "Example":
                real_cvs_count += 1
                continue
                
            # If title IS "Example", check if data is different from default
            # We compare parsed JSONs to avoid whitespace issues
            try:
                # cv.data is already a dict if JSONField is used, or string if TextField
                # Based on models.py it is JSONField, but let's be safe
                cv_data = cv.data
                if isinstance(cv_data, str):
                    cv_data = json.loads(cv_data)
                
                if cv_data != default_cv_json:
                    real_cvs_count += 1
            except Exception:
                # If comparison fails, count it as real to be safe
                real_cvs_count += 1
        
        # Recent activity
        new_users_7_days = User.objects.filter(date_joined__date__gte=last_7_days).count()
        # For new CVs, we can just use the raw count for activity trends
        new_cvs_7_days = CV.objects.filter(created_at__date__gte=last_7_days).count()
        
        # Users by day (last 7 days)
        users_by_day = User.objects.filter(
            date_joined__date__gte=last_7_days
        ).annotate(
            date=TruncDate('date_joined')
        ).values('date').annotate(count=Count('id')).order_by('date')

        # CVs per user (top 10 most active)
        top_users = User.objects.annotate(
            cv_count=Count('cv')
        ).order_by('-cv_count')[:10]

        # Fun stats
        avg_cvs_per_user = real_cvs_count / total_users if total_users > 0 else 0

        # Advanced Insights Containers
        universities = {}
        gpas = []
        grad_years = {}
        job_titles = {}
        locations = {}

        # Parse CVs for Insights
        for cv in all_cvs:
            try:
                cv_data = cv.data
                if isinstance(cv_data, str):
                    cv_data = json.loads(cv_data)
                
                # --- Education Insights ---
                if 'educations' in cv_data and isinstance(cv_data['educations'], list):
                    for edu in cv_data['educations']:
                        # University Name
                        school = edu.get('school')
                        if school:
                            school = school.strip()
                            universities[school] = universities.get(school, 0) + 1
                        
                        # GPA
                        gpa = edu.get('gpa')
                        if gpa:
                            try:
                                # Simple extraction of numeric part if possible
                                gpa_str = str(gpa).replace('/4.0', '').replace('/5.0', '').strip()
                                gpa_val = float(gpa_str)
                                if 0 < gpa_val <= 5.0: # Filter outliers
                                    gpas.append(gpa_val)
                            except:
                                pass # Ignore parse errors
                        
                        # Graduation Year
                        date = edu.get('date') # Format usually "Jan 2020 - May 2024" or "2024"
                        if date:
                            # Extract the last 4 digits as year
                            import re
                            years = re.findall(r'\b20\d{2}\b', date)
                            if years:
                                grad_year = years[-1] # Assume last year is grad year
                                grad_years[grad_year] = grad_years.get(grad_year, 0) + 1

                # --- Job Title Insights ---
                if 'workExperience' in cv_data and isinstance(cv_data['workExperience'], list):
                    for job in cv_data['workExperience']:
                        title = job.get('company') # Often users put title in company or vice versa, but let's check field names
                        # Standard field might be 'jobTitle' or 'position' depending on template
                        # Let's check both possibilities if they exist in schema
                        role = job.get('jobTitle') or job.get('position') or job.get('title')
                        if role:
                            role = role.strip().title() # Normalize case
                            job_titles[role] = job_titles.get(role, 0) + 1

                # --- Location Insights ---
                loc = cv_data.get('address')
                if loc:
                    # Try to extract City/Country if formatted as "City, Country"
                    parts = [p.strip() for p in loc.split(',')]
                    if len(parts) > 0:
                        # Use the last part as broad location (Country or State)
                        region = parts[-1]
                        locations[region] = locations.get(region, 0) + 1

            except Exception as e:
                # print(f"Error parsing CV {cv.id} for insights: {e}") 
                continue

        # Sort and Format Insights for Frontend
        
        # Top 5 Unis
        sorted_unis = sorted(universities.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # Avg GPA
        avg_gpa = round(sum(gpas) / len(gpas), 2) if gpas else 0
        
        # Top 5 Jobs
        sorted_jobs = sorted(job_titles.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # Top 5 Locations
        sorted_locations = sorted(locations.items(), key=lambda x: x[1], reverse=True)[:5]

        return Response({
            'total_users': total_users,
            'total_cvs': real_cvs_count,
            'total_raw_cvs': total_raw_cvs,
            'new_users_7_days': new_users_7_days,
            'new_cvs_7_days': new_cvs_7_days,
            'avg_cvs_per_user': round(avg_cvs_per_user, 2),
            'users_by_day': list(users_by_day),
            'top_users': [
                {'email': u.email[:20] + '...' if len(u.email) > 20 else u.email, 'cv_count': u.cv_count}
                for u in top_users
            ],
            'fun_message': self._get_fun_message(total_users, real_cvs_count),
            'insights': {
                'top_universities': [{'name': k, 'count': v} for k, v in sorted_unis],
                'average_gpa': avg_gpa,
                'grad_years': [{'year': k, 'count': v} for k, v in sorted(grad_years.items())],
                'top_jobs': [{'title': k, 'count': v} for k, v in sorted_jobs],
                'top_locations': [{'name': k, 'count': v} for k, v in sorted_locations]
            },
            'feedback': [
                {
                    'id': f.id,
                    'type': f.feedback_type,
                    'message': f.message,
                    'email': f.email or (f.user.email if f.user else 'Anonymous'),
                    'created_at': f.created_at.isoformat(),
                    'is_read': f.is_read
                }
                for f in Feedback.objects.all()[:10]
            ]
        })

    def _get_fun_message(self, users, cvs):
        """Generate a funny message based on stats"""
        messages = [
            f"🚀 {users} users are beating the ATS bots!",
            f"📄 {cvs} CVs created! That's a lot of job hunting!",
            f"🎯 Average {round(cvs/users, 1) if users else 0} CVs per user. Overachievers!",
            f"💼 You're helping {users} people get their dream jobs!",
            f"🤖 ATS systems hate this one simple trick... {cvs} times!",
        ]
        import random
        return random.choice(messages)


class MakeMeAdminView(APIView):
    """Temporary view to promote user to admin (fixes DB mismatch issues)"""
    permission_classes = [] # Allow anyone with the secret

    def get(self, request):
        secret = request.query_params.get('secret')
        email = request.query_params.get('email')

        if secret != 'simi_magic_key_12345':
            return Response({'error': 'Invalid secret provided. Access denied.'}, status=403)
        
        if not email:
            return Response({'error': 'Email parameter is required.'}, status=400)
            
        try:
            user = User.objects.get(email=email)
            user.is_staff = True
            user.save()
            return Response({'success': True, 'message': f'User {email} is now an ADMIN! 👑 Please log out and log in again.'})
        except User.DoesNotExist:
            return Response({'error': f'User with email {email} was NOT found in this database. Are you registered?'}, status=404)


class FeedbackCreateView(APIView):
    """API endpoint to submit feedback (authenticated or anonymous)"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        feedback_type = request.data.get('feedback_type', 'other')
        message = request.data.get('message', '').strip()
        email = request.data.get('email', '').strip()
        
        if not message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create feedback
        feedback = Feedback.objects.create(
            user=request.user if request.user.is_authenticated else None,
            email=email or (request.user.email if request.user.is_authenticated else ''),
            feedback_type=feedback_type,
            message=message
        )
        
        return Response({
            'success': True,
            'message': 'Thank you for your feedback!'
        }, status=status.HTTP_201_CREATED)


class FeedbackListView(APIView):
    """Admin-only endpoint to view and delete feedback"""
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request):
        feedbacks = Feedback.objects.all()[:20]  # Latest 20
        return Response({
            'feedback': [
                {
                    'id': f.id,
                    'type': f.feedback_type,
                    'message': f.message,
                    'email': f.email or (f.user.email if f.user else 'Anonymous'),
                    'created_at': f.created_at.isoformat(),
                    'is_read': f.is_read
                }
                for f in feedbacks
            ]
        })
    
    def delete(self, request):
        """Delete a feedback by ID"""
        feedback_id = request.query_params.get('id')
        if not feedback_id:
            return Response({'error': 'Feedback ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            feedback = Feedback.objects.get(id=feedback_id)
            feedback.delete()
            return Response({'success': True, 'message': 'Feedback deleted'})
        except Feedback.DoesNotExist:
            return Response({'error': 'Feedback not found'}, status=status.HTTP_404_NOT_FOUND)