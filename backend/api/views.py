import json
from datetime import timedelta
from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncDate

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CV
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

        return Response({
            'total_users': total_users,
            'total_cvs': real_cvs_count,  # Sending the "Real" count for display
            'total_raw_cvs': total_raw_cvs, # Optional: send raw count if needed
            'new_users_7_days': new_users_7_days,
            'new_cvs_7_days': new_cvs_7_days,
            'avg_cvs_per_user': round(avg_cvs_per_user, 2),
            'users_by_day': list(users_by_day),
            'top_users': [
                {'email': u.email[:20] + '...' if len(u.email) > 20 else u.email, 'cv_count': u.cv_count}
                for u in top_users
            ],
            'fun_message': self._get_fun_message(total_users, real_cvs_count)
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