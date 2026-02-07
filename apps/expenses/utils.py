from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from django.conf import settings
import os

try:
    from xhtml2pdf import pisa
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False

def render_to_pdf(template_src, context_dict={}):
    if not PDF_AVAILABLE:
        return HttpResponse("PDF generation is not available in this environment (missing libraries).", status=503)

    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    
    # Handle static files for xhtml2pdf
    def link_callback(uri, rel):
        """
        Convert HTML URIs to absolute system paths so xhtml2pdf can access those resources
        """
        sUrl = settings.STATIC_URL        # Typically /static/
        sRoot = settings.STATIC_ROOT      # Typically /home/userX/project/static/
        mUrl = settings.MEDIA_URL         # Typically /media/
        mRoot = settings.MEDIA_ROOT       # Typically /home/userX/project/media/

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

        # make sure that file exists
        if not os.path.isfile(path):
             # Don't crash on missing files, just return uri
             return uri
        return path

    try:
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result, link_callback=link_callback)
        if not pdf.err:
            return HttpResponse(result.getvalue(), content_type='application/pdf')
    except Exception as e:
        return HttpResponse(f"PDF Generation Error: {str(e)}", status=500)
        
    return None
