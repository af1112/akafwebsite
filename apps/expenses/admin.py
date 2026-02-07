from django.contrib import admin
from .models import ExpenseReport, ExpenseItem

class ExpenseItemInline(admin.TabularInline):
    model = ExpenseItem
    extra = 1
    fields = ('date', 'category', 'description', 'amount', 'receipt_image', 'is_ai_scanned')
    readonly_fields = ('is_ai_scanned', 'ai_confidence')

@admin.register(ExpenseReport)
class ExpenseReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'submitted_by', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'submitted_by', 'created_at')
    inlines = [ExpenseItemInline]
    actions = ['generate_pdf_report']

    def generate_pdf_report(self, request, queryset):
        # Placeholder for PDF generation action
        pass
    generate_pdf_report.short_description = "Download PDF Report"
