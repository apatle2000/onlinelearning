#from django.contrib import admin
from django.urls import path
from . import views

app_name = "staff" 

urlpatterns = [
    path('', views.staff, name='staff_page'),
]
