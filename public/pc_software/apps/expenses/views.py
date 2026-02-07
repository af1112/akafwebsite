from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Sum, Count
from .models import ExpenseReport, ExpenseItem, Trip, Advance
from .forms import ExpenseItemForm, TripForm, AdvanceForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from apps.ai_engine.ocr import extract_receipt_data
from .utils import render_to_pdf
import os

def dashboard(request):
    user = request.user if request.user.is_authenticated else None
    
    context = {}
    if user:
        context['unreported_count'] = ExpenseItem.objects.filter(report__isnull=True, report__submitted_by=user).count()
        context['unsubmitted_count'] = ExpenseReport.objects.filter(status='draft', submitted_by=user).count()
        context['submitted_count'] = ExpenseReport.objects.filter(status__in=['submitted', 'approved'], submitted_by=user).count()
        context['pending_reports'] = ExpenseReport.objects.filter(status='draft', submitted_by=user).order_by('-created_at')[:5]
        context['recent_trips'] = Trip.objects.filter(created_by=user).order_by('-created_at')[:5]
        context['recent_advances'] = Advance.objects.filter(user=user).order_by('-created_at')[:5]
    else:
        # Fallback for demo/dev without login
        context['unreported_count'] = ExpenseItem.objects.filter(report__isnull=True).count()
        context['unsubmitted_count'] = ExpenseReport.objects.filter(status='draft').count()
        context['submitted_count'] = ExpenseReport.objects.filter(status__in=['submitted', 'approved']).count()
        context['pending_reports'] = ExpenseReport.objects.filter(status='draft').order_by('-created_at')[:5]
        context['recent_trips'] = Trip.objects.all().order_by('-created_at')[:5]
        context['recent_advances'] = Advance.objects.all().order_by('-created_at')[:5]

    return render(request, 'expenses/dashboard.html', context)

def create_trip(request):
    if request.method == 'POST':
        form = TripForm(request.POST)
        if form.is_valid():
            trip = form.save(commit=False)
            if request.user.is_authenticated:
                trip.created_by = request.user
            else:
                # Assign to first user or admin for dev
                from django.contrib.auth import get_user_model
                User = get_user_model()
                trip.created_by = User.objects.first()
            trip.save()
            return redirect('dashboard')
    else:
        form = TripForm()
    return render(request, 'expenses/trip_form.html', {'form': form})

def create_advance(request):
    if request.method == 'POST':
        form = AdvanceForm(request.POST)
        if form.is_valid():
            advance = form.save(commit=False)
            if request.user.is_authenticated:
                advance.user = request.user
            else:
                from django.contrib.auth import get_user_model
                User = get_user_model()
                advance.user = User.objects.first()
            advance.save()
            return redirect('dashboard')
    else:
        form = AdvanceForm()
    return render(request, 'expenses/advance_form.html', {'form': form})

def create_expense(request):
    if request.method == 'POST':
        form = ExpenseItemForm(request.POST, request.FILES)
        if form.is_valid():
            expense = form.save(commit=False)
            # Link to report if selected in form, otherwise it's unreported
            # expense.report is already handled by form save if field exists
            expense.save()
            return redirect('dashboard')
    else:
        form = ExpenseItemForm()
    
    return render(request, 'expenses/expense_form.html', {'form': form})

def report_detail(request, report_id):
    report = get_object_or_404(ExpenseReport, id=report_id)
    # Group expenses by date or category if needed
    expenses = report.items.all().order_by('date')
    advances = report.advances.all()
    
    context = {
        'report': report,
        'expenses': expenses,
        'advances': advances,
    }
    return render(request, 'expenses/report_detail.html', context)

@csrf_exempt
def scan_receipt_api(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        temp_path = f'temp_{image_file.name}'
        with open(temp_path, 'wb+') as destination:
            for chunk in image_file.chunks():
                destination.write(chunk)
        
        try:
            data = extract_receipt_data(temp_path)
            os.remove(temp_path)
            return JsonResponse({'status': 'success', 'data': data})
        except Exception as e:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return JsonResponse({'status': 'error', 'message': str(e)})
            
    return JsonResponse({'status': 'error', 'message': 'No image provided'})

def export_report_pdf(request, report_id):
    report = get_object_or_404(ExpenseReport, id=report_id)
    pdf = render_to_pdf('expenses/report_pdf.html', {'report': report})
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = f"Expense_Report_{report.title}_{report.created_at.strftime('%Y%m%d')}.pdf"
        content = f"inline; filename={filename}"
        response['Content-Disposition'] = content
        return response
    return HttpResponse("Error Rendering PDF", status=400)
