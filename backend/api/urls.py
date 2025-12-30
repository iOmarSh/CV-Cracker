from django.urls import path
from .views import CVListView, CVDetailView, AdminStatsView, MakeMeAdminView, FeedbackCreateView, FeedbackListView

urlpatterns = [
    path('cv/', CVListView.as_view(), name='cv-list'),
    path('cv/<int:pk>/', CVDetailView.as_view(), name='cv-detail'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('admin/promote/', MakeMeAdminView.as_view(), name='admin-promote'),
    path('feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
    path('admin/feedback/', FeedbackListView.as_view(), name='feedback-list'),
]