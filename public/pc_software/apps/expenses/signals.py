from django.db.models.signals import post_save
from django.dispatch import receiver
from expenses.models import ExpenseItem
from apps.ai_engine.ocr import extract_receipt_data
from datetime import datetime

@receiver(post_save, sender=ExpenseItem)
def scan_receipt_on_upload(sender, instance, created, **kwargs):
    """
    Trigger AI OCR when a receipt image is uploaded and 'is_ai_scanned' is False.
    """
    if instance.receipt_image and not instance.is_ai_scanned:
        # Perform OCR
        try:
            file_path = instance.receipt_image.path
            data = extract_receipt_data(file_path)

            # Update fields if found and not already set manually
            updated = False
            
            if not instance.amount and data['amount']:
                instance.amount = data['amount']
                updated = True
                
            if not instance.description and data['description']:
                instance.description = data['description']
                updated = True
            
            if not instance.category and data['category']:
                instance.category = data['category']
                updated = True
                
            # Parse Date if needed (simplified)
            # if not instance.date and data['date']: ...

            instance.raw_ocr_text = data['raw_text']
            instance.is_ai_scanned = True
            instance.ai_confidence = 0.85 if data['amount'] else 0.3  # Mock confidence
            
            # Save without triggering signal again
            ExpenseItem.objects.filter(pk=instance.pk).update(
                amount=instance.amount,
                description=instance.description,
                category=instance.category,
                raw_ocr_text=instance.raw_ocr_text,
                is_ai_scanned=True,
                ai_confidence=instance.ai_confidence
            )
            
            # Update Report Total
            instance.report.update_total()
        except Exception as e:
            print(f"Error in OCR signal: {e}")
