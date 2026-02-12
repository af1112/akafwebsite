from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Ticket, TicketComment, TicketAttachment
from django.utils.translation import gettext as _
import json

@login_required
def ticket_list(request):
    tickets = Ticket.objects.filter(created_by=request.user)
    context = {
        'tickets': tickets
    }
    return render(request, 'ticketing/ticket_list.html', context)

@login_required
def ticket_detail(request, pk):
    ticket = get_object_or_404(Ticket, pk=pk)
    if ticket.created_by != request.user and not request.user.is_staff:
        messages.error(request, _("You do not have permission to view this ticket."))
        return redirect('ticket_list')

    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            comment = TicketComment.objects.create(
                ticket=ticket,
                user=request.user,
                content=content
            )
            
            # Handle multiple file attachments
            files = request.FILES.getlist('attachments')
            for f in files:
                TicketAttachment.objects.create(
                    comment=comment,
                    file=f,
                    file_type='file'
                )
            
            # Handle voice recording
            voice_data = request.FILES.get('voice_recording')
            if voice_data:
                TicketAttachment.objects.create(
                    comment=comment,
                    file=voice_data,
                    file_type='voice'
                )
                
            # Handle video recording
            video_data = request.FILES.get('video_recording')
            if video_data:
                TicketAttachment.objects.create(
                    comment=comment,
                    file=video_data,
                    file_type='video'
                )

            messages.success(request, _("Comment added."))
            return redirect('ticket_detail', pk=pk)

    context = {
        'ticket': ticket
    }
    return render(request, 'ticketing/ticket_detail.html', context)

@login_required
def ticket_create(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        priority = request.POST.get('priority')
        category = request.POST.get('category')
        remote_software_name = request.POST.get('remote_software_name')
        remote_software_id = request.POST.get('remote_software_id')
        
        if title and description:
            ticket = Ticket.objects.create(
                title=title,
                description=description,
                priority=priority,
                category=category,
                remote_software_name=remote_software_name,
                remote_software_id=remote_software_id,
                created_by=request.user
            )
            
            # Handle multiple file attachments
            files = request.FILES.getlist('attachments')
            for f in files:
                TicketAttachment.objects.create(
                    ticket=ticket,
                    file=f,
                    file_type='file'
                )

            # Handle voice recording
            voice_data = request.FILES.get('voice_recording')
            if voice_data:
                TicketAttachment.objects.create(
                    ticket=ticket,
                    file=voice_data,
                    file_type='voice'
                )
                
            # Handle video recording
            video_data = request.FILES.get('video_recording')
            if video_data:
                TicketAttachment.objects.create(
                    ticket=ticket,
                    file=video_data,
                    file_type='video'
                )

            messages.success(request, _("Ticket created successfully."))
            return redirect('ticket_list')
        else:
            messages.error(request, _("Please fill in all required fields."))
            
    return render(request, 'ticketing/ticket_form.html', context={})
