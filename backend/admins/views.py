# Create your views here.
#from django.shortcuts import render


from django.http import HttpResponse
from django.shortcuts import render
from records.constants import field_sizes

#temp function to return a page
def admins(request):
    return HttpResponse("This will be an admin page "+str(field_sizes))