from django.urls import path
from . import views

app_name = "login" 

urlpatterns = [
     path('get_users/', views.getUsers),
     path('get_me/', views.getMe),
     path('signup/', views.signUp),
     path('login/', views.login),
     path('updateuser/',views.updateUser),
     path('logout/',views.logout),
]