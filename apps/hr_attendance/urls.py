from django.urls import path
from . import views

app_name = 'hr_attendance'

urlpatterns = [
    path('', views.attendance_dashboard, name='dashboard'),
    path('clock-in/', views.clock_in, name='clock_in'),
    path('clock-out/', views.clock_out, name='clock_out'),
]
