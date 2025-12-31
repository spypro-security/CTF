from django.urls import path
from . import views

urlpatterns = [
    # Internship application endpoints
    path('submit/', views.submit_application, name='submit_application'),
    path('check-status/', views.check_application_status, name='check_application_status'),
    path('list/', views.get_applications, name='get_applications'),
    path('detail/<int:pk>/', views.get_application_detail, name='get_application_detail'),
    path('status/<int:pk>/', views.update_application_status, name='update_application_status'),

    # Job application endpoints (mirror internship endpoints)
    path('jobs/submit/', views.submit_job_application, name='submit_job_application'),
    path('jobs/check-status/', views.check_job_application_status, name='check_job_application_status'),
    path('jobs/list/', views.get_job_applications, name='get_job_applications'),
    path('jobs/detail/<int:pk>/', views.get_job_application_detail, name='get_job_application_detail'),
    path('jobs/status/<int:pk>/', views.update_job_application_status, name='update_job_application_status'),
]