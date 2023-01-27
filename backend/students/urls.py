#from django.contrib import admin
from django.urls import path
from . import views


app_name = "students" 


urlpatterns = [
    #path('admin/', admin.site.urls),
    path('getmycourses/', views.getMyCourses, name='getmycourses'),
    path('getmyscores/', views.getMyScores, name='getmyscores'),
    path('addtomycourses/', views.addToMyCourses, name='addtomycourses'),
    path('addtomyscores/', views.addToMyScores, name='addtomyscores'),
]
