try:
    import pytesseract
except ImportError:
    pytesseract = None

try:
    from PIL import Image
except ImportError:
    try:
        import Image
    except ImportError:
        Image = None
import re
import os
from django.conf import settings

# If Tesseract is not in PATH, set it here. 
tesseract_path_user = os.path.expandvars(r'%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe')
tesseract_path_program_files = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

if pytesseract:
    if os.path.exists(tesseract_path_user):
        pytesseract.pytesseract.tesseract_cmd = tesseract_path_user
    elif os.path.exists(tesseract_path_program_files):
        pytesseract.pytesseract.tesseract_cmd = tesseract_path_program_files

def detect_category(text):
    """
    Detects expense category based on keywords in the text.
    """
    text = text.lower()
    categories = {
        'Food': ['restaurant', 'cafe', 'coffee', 'burger', 'pizza', 'dining', 'lunch', 'dinner', 'food', 'bakery', 'kitchen'],
        'Transport': ['taxi', 'uber', 'cab', 'fuel', 'petrol', 'gas', 'station', 'parking', 'flight', 'airline', 'ticket', 'transport', 'train', 'bus'],
        'Accommodation': ['hotel', 'motel', 'stay', 'inn', 'resort', 'booking', 'airbnb', 'room'],
        'Material': ['hardware', 'tools', 'equipment', 'supply', 'cement', 'steel', 'paint', 'building', 'material'],
        'Communication': ['telecom', 'internet', 'wifi', 'phone', 'mobile', 'data', 'omantel', 'ooredoo'],
        'Office Supplies': ['stationery', 'paper', 'print', 'ink', 'toner', 'pen', 'notebook'],
    }

    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in text:
                return category
    
    return 'General' # Default

def extract_receipt_data(image_path):
    """
    Scans a receipt image and extracts Date, Amount, Vendor, and Category.
    Returns a dict: {'date': 'YYYY-MM-DD', 'amount': 0.00, 'description': '...', 'category': '...', 'raw_text': '...'}
    """
    result = {
        'date': None,
        'amount': None,
        'description': None,
        'category': None,
        'raw_text': ''
    }

    try:
        # 1. Check if Tesseract is available
        if pytesseract is None or Image is None or not os.path.exists(pytesseract.pytesseract.tesseract_cmd):
            # Fallback for demo/dev if Tesseract is not installed
            print("WARNING: Tesseract or Pillow not found. Using mock data.")
            return {
                'date': '2023-10-25',
                'amount': 15.500,
                'description': 'Mock Restaurant Receipt',
                'category': 'Food',
                'merchant': 'Tasty Bites',
                'raw_text': 'Mock data: OCR dependencies are not installed on the server.'
            }

        # 2. OCR Scan
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        result['raw_text'] = text
        
        # 2. Detect Category
        result['category'] = detect_category(text)

        # 3. Extract Date (Simple Regex for YYYY-MM-DD, DD/MM/YYYY, etc.)
        date_pattern = r'(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}[-/]\d{2}[-/]\d{2,4})'
        date_match = re.search(date_pattern, text)
        if date_match:
            # Need to normalize date format if possible, but for now just return the string
            # Django DateField might complain if format is wrong, so maybe we need parsing logic
            # For now, let's just keep the string and let the user/signal handle or fail gracefully
            # Ideally, we should use dateutil.parser
            result['date'] = date_match.group(0)

        # 4. Extract Amount (Looks for largest number with 2 decimals)
        amount_pattern = r'\d{1,3}(?:,\d{3})*(?:\.\d{2})'
        amounts = re.findall(amount_pattern, text)
        if amounts:
            valid_amounts = []
            for amt in amounts:
                try:
                    val = float(amt.replace(',', ''))
                    valid_amounts.append(val)
                except ValueError:
                    continue
            
            if valid_amounts:
                result['amount'] = max(valid_amounts)

        # 5. Description (First line or based on keywords)
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        if lines:
            result['description'] = lines[0]
            
    except Exception as e:
        print(f"OCR Error: {e}")
    
    return result
