from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from django.conf import settings
import os
import logging

# Configure logger
logger = logging.getLogger(__name__)

# Try importing xhtml2pdf, fallback if missing (to avoid app crash on Vercel if lib dependencies missing)
try:
    from xhtml2pdf import pisa
    PDF_LIB_AVAILABLE = True
except ImportError as e:
    logger.error(f"PDF Library Import Error: {e}")
    PDF_LIB_AVAILABLE = False
except Exception as e:
    logger.error(f"PDF Library Unexpected Error: {e}")
    PDF_LIB_AVAILABLE = False

def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    sUrl = settings.STATIC_URL        # Typically /static/
    sRoot = settings.STATIC_ROOT      # Typically /home/user/var/www/static/
    mUrl = settings.MEDIA_URL         # Typically /media/
    mRoot = settings.MEDIA_ROOT       # Typically /home/user/var/www/media/

    # Convert Windows paths to Unix-style for Vercel/Linux if needed, but os.path.join handles it.
    # On Vercel, static files are collected to STATIC_ROOT.
    
    if uri.startswith(mUrl):
        path = os.path.join(mRoot, uri.replace(mUrl, ""))
    elif uri.startswith(sUrl):
        path = os.path.join(sRoot, uri.replace(sUrl, ""))
    else:
        return uri

    return path

def render_to_pdf(template_src, context_dict={}):
    if not PDF_LIB_AVAILABLE:
        return HttpResponse("PDF Library not available. Please contact support.", content_type='text/plain')

    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    
    try:
        # Use link_callback to handle static files (images, css)
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result, link_callback=link_callback)
        
        if not pdf.err:
            return HttpResponse(result.getvalue(), content_type='application/pdf')
    except Exception as e:
        logger.error(f"PDF Generation Error: {e}")
        return HttpResponse(f"Error generating PDF: {e}", content_type='text/plain')
        
    return None
