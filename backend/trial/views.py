# Create your views here.
#from django.shortcuts import render

from django.shortcuts import render
from django.http import HttpResponse

def trial(requests):
    return HttpResponse("This is going to be a trial module and will exist only for testing purposes")