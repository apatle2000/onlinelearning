from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view 
from django.contrib.auth.hashers import make_password, check_password
#from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from records.constants import special_charecters_list
from login.serializers import PersonSerializer, UserSerializer
from login.models import Person
from records.views import Decriptor, EncriptorLoader, TokenValidator, DeleteToken
import json



@api_view(["POST"])
def login(request):

    dct = request.data
    snack = {
        "reply": "Wrong info",
        "token": None,
        "loggedAs": None
    }
    person_x = Person.objects.filter(username = dct.get("username" ))
    if person_x.exists():
        secret = PersonSerializer(person_x, many=True).data[0]
        # checking if password is valid 
        if check_password(dct.get("password"),secret.get("password")):
            tokenString = {"username":secret.get("username"),"roll":secret.get("roll")}
            snack.update({
                "token": EncriptorLoader(secret.get("login_id"),tokenString),
                "loggedAs": person_x.first().roll,
                "reply": "approved"
            })
    return Response(snack)







@api_view(['POST','Get'])
def getUsers(request):
    """
        To return all avilable users present in the database 
    """
    items = Person.objects.all()
    serializer = UserSerializer(items,many ="True")
    return Response(serializer.data)







@api_view(['POST'])
def signUp(request):
    """
    methord to add/create user in the data base
    """
    snack = {}
    serializer = PersonSerializer(data = request.data)
    if serializer.is_valid(): 
        dct = serializer.data

        dct["password"] = make_password(dct.get("password"))
        serializer = PersonSerializer(data = dct)

        if serializer.is_valid():
            serializer.save()
            # getting an instance of user from db 
            person_x = PersonSerializer(Person.objects.filter(username = dct.get("username" )),many="True").data[0]
            tokenString = {"username":person_x.get("username"),"roll":person_x.get("roll")}
            snack.update({
                "token": EncriptorLoader(person_x.get("login_id"),tokenString),
                "loggedAs": person_x.get("roll"),
                "reply": "loginSuccessfull"
            })
            return Response(snack)
        else:
            logmessage =""
            for i in serializer.errors:
                logmessage= logmessage + "\ncheck " + i +" : "+ serializer.errors[i][0]
            snack.update({
                "token": None,
                "loggedAs": None,
                "reply": logmessage
            })
            return Response(snack)
    else:
        logmessage =""
        for i in serializer.errors:
            logmessage= logmessage + "\ncheck " + i +" : "+ serializer.errors[i][0]
        snack.update({
                "token": None,
                "loggedAs": None,
                "reply": logmessage
            })
        return Response(snack)




@api_view(['POST'])
def updateUser(request):
    """
        methord to modify user data in db
    """
    payload = {
            "values": None,
            "code" : "token error",
            "message" : "token error",
    }
    token = request.data.pop("token")
    dtc = Decriptor(token)
    if dtc:
        item = Person.objects.get(username = dtc.get("username" ))
        if item:
            person_x = UserSerializer(instance = item, data = request.data)
            if person_x.is_valid():
                person_x.save()
                payload.update({
                    "values" : person_x.data,
                    "code" : "good",
                    "message" : "pass", 
                })
                return Response(payload)
            else:
                payload.update({
                    "values": None,
                    "code" : "process error",
                    "message" : "error while updating values", 
                })
                return Response(payload)
        else:
            payload.update({
                    "values": None,
                    "code" : "user error",
                    "message" : "person dosent exist", 
            })
            return Response(payload)

    else:
        return Response(payload)




@api_view(['POST'])
def getMe(request):
    """
        methord to get a paticular user's data 
    """
    payload = {
            "values": None,
            "code" : "token error",
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = Decriptor(token)
    if dtc:
        person_x = Person.objects.filter(pk = dtc["id"])
        if person_x.exists():
            secret = PersonSerializer(person_x, many=True).data[0]
            payload.update({
                "values" : secret,
                "code" : "good",
                "message" : "pass", 
            })
            return Response(payload)
        else:
            payload.update({
                "values": None,
                "code" : "user error",
                "message" : "person dosent exist", 
            })
            return Response(payload)
    else:
        return Response(payload)





@api_view(['POST'])
def logout(request):
    """
        methord to signout the user when called by deleting the token
    """
    token = request.data.get("token")
    success = DeleteToken(token)
    return Response({"logged out":success})




#The json format 
"""
{
"first_name" : "Sathya",
"last_name" : "Sai",
"user_name" : "SSS",
"password" : "SSPN@515134",
"email" : "Sathya@gmail.com",
"contact_number"  : "5747385475",
"gender" : "Male",
"active_status" : 1,
"roll" : "admin",
"description" : "Test acc"
} 
"""
