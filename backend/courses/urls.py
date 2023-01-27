from django.urls import path, include
from . import views


app_name = "courses" 


urlpatterns = [
     path('getallcourses/', views.getallCourses, name='getallcourses'),
     path('addcourse/', views.addcourse, name='addcourse'),
     path('addtest/', views.addtest, name="addtest"),
     path('getalltests/', views.getallTests, name="getalltests"),
     path('getstaffcourses/', views.getStaffCourses, name="getstaffcources"),
     path('getstafftests/', views.getStaffTests, name="getstafftests"),
     path('getcoursetests/', views.getCourseTests, name="getcoursetests"),
     path('addmodule/', views.addModule, name="addmodule"),
     path('getcoursemodule/', views.getCourseModule, name="getcoursemodule"),
     path('getspecificmodule/', views.getSpecificModule, name="getspecificmodule")
]
