# Create your views here.
#from django.shortcuts import render


from django.http import HttpResponse
from django.shortcuts import render

#temp function to return a page
def staff(request):
    return HttpResponse("This will be an staff page ")