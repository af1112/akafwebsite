def extract_text_from_image(image_file):
    """
    Mock OCR function for development/serverless environments where Tesseract is missing.
    """
    return "Mock OCR Text: Date: 2023-10-27, Total: 150.00 OMR, Merchant: Lulu Hypermarket"

def extract_receipt_data(image_path):
    """
    Mock function for signals to use.
    Returns a dictionary of extracted data.
    """
    # Mock logic
    return {
        'amount': 150.00,
        'description': 'Office Supplies',
        'category': 'Material',
        'raw_text': extract_text_from_image(image_path),
        'date': '2023-10-27',
        'merchant': 'Lulu Hypermarket'
    }
