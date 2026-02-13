from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.contrib import messages
from .models import Attendance
from django.utils.translation import gettext as _
import base64

@login_required
def attendance_dashboard(request):
    today = timezone.now().date()
    attendance, created = Attendance.objects.get_or_create(user=request.user, date=today)
    
    recent_attendances = Attendance.objects.filter(user=request.user).order_by('-date')[:5]
    
    # Check if photo is required
    require_photo = True
    if hasattr(request.user, 'profile'):
        require_photo = request.user.profile.require_photo
    
    context = {
        'attendance': attendance,
        'recent_attendances': recent_attendances,
        'today': today,
        'require_photo': require_photo,
    }
    return render(request, 'hr_attendance/dashboard.html', context)

@login_required
def clock_in(request):
    if request.method == 'POST':
        today = timezone.now().date()
        attendance, created = Attendance.objects.get_or_create(user=request.user, date=today)
        
        if not attendance.clock_in:
            attendance.clock_in = timezone.now()
            
            # Save location if provided
            lat = request.POST.get('latitude')
            lng = request.POST.get('longitude')
            if lat and lng:
                attendance.latitude = lat
                attendance.longitude = lng
            
            # Save photo if provided
            photo_data = request.POST.get('photo')
            if photo_data:
                # Save the raw base64 string directly to the database
                # since the filesystem is read-only on production
                attendance.photo_in = photo_data
            
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
                
                # Update location if provided (exit location)
                lat = request.POST.get('latitude')
                lng = request.POST.get('longitude')
                if lat and lng:
                    attendance.latitude = lat
                    attendance.longitude = lng
                
                # Save photo if provided
                photo_data = request.POST.get('photo')
                if photo_data:
                    # Save the raw base64 string directly to the database
                    # since the filesystem is read-only on production
                    attendance.photo_out = photo_data

                attendance.save()
                messages.success(request, _("Clock-out recorded successfully!"))
            elif not attendance.clock_in:
                messages.error(request, _("You must clock in first."))
            else:
                messages.warning(request, _("You have already clocked out today."))
        except Attendance.DoesNotExist:
            messages.error(request, _("No attendance record found for today. Please clock in first."))
            
    return redirect('hr_attendance:dashboard')
