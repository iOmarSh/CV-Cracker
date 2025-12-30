from django.db import models

class CV(models.Model):
    user = models.ForeignKey('auth_app.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)


class Feedback(models.Model):
    """User feedback for admin review"""
    FEEDBACK_TYPES = [
        ('bug', 'Bug Report'),
        ('suggestion', 'Suggestion'),
        ('praise', 'Praise'),
        ('other', 'Other')
    ]
    
    user = models.ForeignKey('auth_app.User', on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField(blank=True)
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPES, default='other')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.feedback_type}: {self.message[:50]}"