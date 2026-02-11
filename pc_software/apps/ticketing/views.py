from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Ticket, TicketComment
from django.utils.translation import gettext as _

@login_required
def ticket_list(request):
    tickets = Ticket.objects.filter(created_by=request.user)
    # If user is staff/admin, they might see all or assigned tickets. 
    # For now, let's keep it simple: users see their own tickets.
    
    context = {
        'tickets': tickets
    }
    return render(request, 'ticketing/ticket_list.html', context)

@login_required
def ticket_detail(request, pk):
    ticket = get_object_or_404(Ticket, pk=pk)
    # Check permission
    if ticket.created_by != request.user and not request.user.is_staff:
        messages.error(request, _("You do not have permission to view this ticket."))
        return redirect('ticket_list')

    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            TicketComment.objects.create(
                ticket=ticket,
                user=request.user,
                content=content
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
        
        if title and description:
            Ticket.objects.create(
                title=title,
                description=description,
                priority=priority,
                category=category,
                created_by=request.user
            )
            messages.success(request, _("Ticket created successfully."))
            return redirect('ticket_list')
        else:
            messages.error(request, _("Please fill in all required fields."))
            
    return render(request, 'ticketing/ticket_form.html', context={})
