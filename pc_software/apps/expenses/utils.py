from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.conf import settings
import os
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

def render_to_pdf(template_src, context_dict={}):
    # Register Persian font
    try:
        font_path = os.path.join(str(settings.BASE_DIR), 'static', 'fonts', 'IRANYekanWebRegular.ttf')
        if os.path.exists(font_path):
            pdfmetrics.registerFont(TTFont('IranYekan', font_path))
        else:
            print(f"DEBUG: Font file not found at {font_path}")
    except Exception as e:
        # Ignore if already registered
        pass

    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    
    # Handle static files for xhtml2pdf
    def link_callback(uri, rel):
        """
        Convert HTML URIs to absolute system paths so xhtml2pdf can access those resources
        """
        sUrl = settings.STATIC_URL        # Typically /static/
        sRoot = str(settings.STATIC_ROOT) # Typically /home/userX/project/static/
        mUrl = settings.MEDIA_URL         # Typically /media/
        mRoot = str(settings.MEDIA_ROOT)  # Typically /home/userX/project/media/

        # Ensure sUrl starts with / for consistent matching
        if not sUrl.startswith('/'):
            sUrl = '/' + sUrl
            
        # Ensure mUrl starts with / for consistent matching
        if not mUrl.startswith('/'):
            mUrl = '/' + mUrl

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
            
            # Check if file exists in STATIC_ROOT, if not check STATICFILES_DIRS
            if not os.path.isfile(path):
                if hasattr(settings, 'STATICFILES_DIRS'):
                    for static_dir in settings.STATICFILES_DIRS:
                        static_dir = str(static_dir)
                        possible_path = os.path.join(static_dir, uri.replace(sUrl, ""))
                        if os.path.isfile(possible_path):
                            path = possible_path
                            break
        else:
            return uri

        # make sure that file exists
        if not os.path.isfile(path):
             # Fallback: if path construction failed, try to find it in STATICFILES_DIRS manually
             # assuming uri matches a static file pattern
             if '/static/' in uri:
                 relative_path = uri.split('/static/')[-1]
                 if hasattr(settings, 'STATICFILES_DIRS'):
                    for static_dir in settings.STATICFILES_DIRS:
                        static_dir = str(static_dir)
                        possible_path = os.path.join(static_dir, relative_path)
                        if os.path.isfile(possible_path):
                            return possible_path
            
             # If still not found, print debug info
             print(f"DEBUG: File not found in link_callback. URI: {uri}, Path: {path}")
             # We don't raise exception here to allow other resources to load if possible, 
             # but for fonts it will likely fail later.
             # raise Exception('media URI must start with %s or %s' % (sUrl, mUrl))

        return path

    # For Farsi/Arabic support, we use UTF-8 encoding.
    # xhtml2pdf requires a font that supports these characters (e.g. DejaVuSans) in the CSS.
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result, link_callback=link_callback)
    
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None
