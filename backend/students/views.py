# Create your views here.
#from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view 
from records.views import Decriptor, EncriptorLoader, TokenValidator, DeleteToken
from students.models import Test_Scores, Accessed_Course 
from students.serializer import AccessedCourseSerializer, TestScoresSerializer, MyCourseSerializer, MyTestScoresSerializer
import json
 


@api_view(["POST"])
def addToMyScores(request):
   pass

    


@api_view(["POST"])
def addToMyCourses(request):
    """
        To return all avilable cources present in the database 
    """
    payload = {
            "values": None,
            "code" : 401,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = Decriptor(token)
    if dtc:
        items = Accessed_Course.objects.filter(
            course_id = request.data.get("course_id"),
            login_id = dtc.get("id"),
            )
        if items.exists():
            payload.update({
                "values": request.data.get("course_id"),
                "code" : 200,
                "message" : "Course already suscribed",
            })
        else:
            request.data["login_id"] = dtc.get("id")
            serializer = AccessedCourseSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                payload.update({
                    "values": serializer.data,
                    "code" : 200,
                    "message" : "Course added to subscription list",
                })
            else:
                payload.update({
                    "values": None,
                    "code" : 203,
                    "message" : "Bad request",
                })
    
    return Response(payload)





@api_view(["POST"])
def getMyScores(request):
    pass




@api_view(["POST"])
def getMyCourses(request):
    """
        To return all avilable cources present in the database 
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = Decriptor(token)
    if dtc:
        items = Accessed_Course.objects.filter(login_id = dtc.get("id"))
        if items.exists():
            serializer = MyCourseSerializer(items,many ="True")
            payload.update({
                "values": serializer.data,
                "code" : 200,
                "message" : None,
            })
            return Response(payload)
        else:
            payload.update({
                "values": None,
                "code" : 204,
                "message" : "No courses",
            })
            return Response(payload)
    return Response(payload)



