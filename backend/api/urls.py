from django.urls import path
from .views import CVListView, CVDetailView, AdminStatsView, MakeMeAdminView

urlpatterns = [
    path('cv/', CVListView.as_view(), name='cv-list'),
    path('cv/<int:pk>/', CVDetailView.as_view(), name='cv-detail'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('admin/promote/', MakeMeAdminView.as_view(), name='admin-promote'),
]