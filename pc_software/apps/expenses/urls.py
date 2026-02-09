from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('statements/', views.statement_list, name='statement_list'),
    path('create/', views.create_expense, name='create_expense'),
    path('statement/create/', views.create_report, name='create_report'),
    path('trip/create/', views.create_trip, name='create_trip'),
    path('advance/create/', views.create_advance, name='create_advance'),
    path('report/<uuid:report_id>/', views.report_detail, name='report_detail'),
    path('report/<uuid:report_id>/pdf/', views.export_report_pdf, name='export_report_pdf'),
    path('api/scan-receipt/', views.scan_receipt_api, name='scan_receipt_api'),
]
