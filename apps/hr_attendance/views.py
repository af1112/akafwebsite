from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.contrib import messages
from .models import Attendance
from django.utils.translation import gettext as _

@login_required
def attendance_dashboard(request):
    today = timezone.now().date()
    attendance, created = Attendance.objects.get_or_create(user=request.user, date=today)
    
    recent_attendances = Attendance.objects.filter(user=request.user).order_by('-date')[:5]
    
    context = {
        'attendance': attendance,
        'recent_attendances': recent_attendances,
        'today': today,
    }
    return render(request, 'hr_attendance/dashboard.html', context)

@login_required
def clock_in(request):
    if request.method == 'POST':
        today = timezone.now().date()
        attendance, created = Attendance.objects.get_or_create(user=request.user, date=today)
        
        if not attendance.clock_in:
            attendance.clock_in = timezone.now()
            # Get IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                attendance.ip_address = x_forwarded_for.split(',')[0]
            else:
                attendance.ip_address = request.META.get('REMOTE_ADDR')
            
            attendance.save()
            messages.success(request, _("Clock-in recorded successfully!"))
        else:
            messages.warning(request, _("You have already clocked in today."))
            
    return redirect('hr_attendance:dashboard')

@login_required
def clock_out(request):
    if request.method == 'POST':
        today = timezone.now().date()
        try:
            attendance = Attendance.objects.get(user=request.user, date=today)
            if attendance.clock_in and not attendance.clock_out:
                attendance.clock_out = timezone.now()
                attendance.save()
                messages.success(request, _("Clock-out recorded successfully!"))
            elif not attendance.clock_in:
                messages.error(request, _("You must clock in first."))
            else:
                messages.warning(request, _("You have already clocked out today."))
        except Attendance.DoesNotExist:
            messages.error(request, _("No attendance record found for today. Please clock in first."))
            
    return redirect('hr_attendance:dashboard')
