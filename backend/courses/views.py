from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from login.models import Person
from records.constants import special_charecters_list
from login.serializers import PersonSerializer, UserSerializer
from login.models import Person
from courses.models import Course_Modules, Courses, Tests, Question_Bank, Options
from courses.serializers import CourseModuleSerializer, CourseSerializer, TestsSerializer, QuetionBankSerializer, OptionsSerializer
from records.views import Decriptor, EncriptorLoader, TokenValidator, DeleteToken
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def getallCourses(request):
    """
        To return all avilable cources present in the database 
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = TokenValidator(token)
    if dtc:
        items = Courses.objects.all()
        if not items.exists():
            payload.update({
                "values": None,
                "code" : 204,
                "message" : "No courses",
            })
            return Response(payload)
        serializer = CourseSerializer(items, many ="True")
        #serializer.data.pop("login_id")
        for i in serializer.data:
            #removing the login id from fields being returned to the client
            i.pop("login_id") 
        payload.update({
            "values": serializer.data,
            "code" : 200,
            "message" : None,
        })
    return Response(payload)


@api_view(['POST'])
def getStaffCourses(request):
    """
        To return user specific cources present in the database created by staff member
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = Decriptor(token)
    if dtc:
        items = Courses.objects.filter(login_id = dtc.get("id"))
        if items.exists():
            serializer = CourseSerializer(items,many ="True")
            #serializer.data.pop("login_id")
            for i in serializer.data:
                #removing the login id from fields being returned to the client
                i.pop("login_id") 
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



@api_view(['POST'])
def addcourse(request):
    """
        To add a course to the data base 
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.pop("token")
    dtc = Decriptor(token)
    if dtc:
        course_x = Courses.objects.filter(course_name = request.data.get("course_name"))
        if course_x.exists():
            payload.update({
                "values": None,
                "code" : 401,
                "message" : "course name already exists",
            })
        else:
            request.data.update({"login_id":dtc["id"]})
            serializer = CourseSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                for i in serializer.data:
                    i.pop("login_id") #somehow this stopped working :-(
                payload.update({
                    "values": serializer.data,
                    "code" : 200,
                    "message" : "course was added to our records",
                })
            else:
                logmessage =""
                for i in serializer.errors:
                    logmessage= logmessage + "\ncheck " + i +" : "+ serializer.errors[i][0]
                payload.update({
                    "values": logmessage,
                    "code" : 204,
                    "message" : "something went wrong",
                })
    
    return Response(payload)






@api_view(['POST'])
def addtest(request):
    """
        To add a test to the database  
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.pop("token")
    dtc = Decriptor(token)
    if dtc:
        test_x = None
        if request.data.get("course_id"):
            test_x = Tests.objects.filter(
                course_id = request.data.get("course_id"),
                test_name = request.data.get("test_name"),
                )
        else:
            test_x = Tests.objects.filter(test_name = request.data.get("test_name"))
        if test_x.exists():
            payload.update({
                "values": None,
                "code" : 401,
                "message" : "test name already exists",
            })
        else:
            request.data.update({"login_id":dtc["id"]})
            serializer = TestsSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                #for i in serializer.data:   #suddenly stopped working 
                #    i.pop("login_id")
                payload.update({
                    "values": serializer.data,
                    "code" : 200,
                    "message" : "test was added to our records",
                })
            else:
                logmessage =""
                for i in serializer.errors:
                    logmessage= logmessage + "\ncheck " + i +" : "+ serializer.errors[i][0]
                payload.update({
                    "values": serializer.data,
                    "code" : 204,
                    "message" : "something went wrong",
                })
    
    return Response(payload)

   

@api_view(['POST'])
def getallTests(request):
    """
        To return all avilable tests present in the database 
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = TokenValidator(token)
    if dtc:
        items = Tests.objects.filter(course_id = None)
        if items.exists():
            serializer = TestsSerializer(items,many ="True")
            #serializer.data.pop("login_id")
            for i in serializer.data:
                #removing the login id from fields being returned to the client
                i.pop("login_id") 
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



@api_view(['POST'])
def getCourseTests(request):
    """
        To return all avilable tests present in the database 
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = TokenValidator(token)
    if dtc:
        items = Tests.objects.filter(course_id = request.data["course_id"])
        if items.exists():
            serializer = TestsSerializer(items,many ="True")
            #serializer.data.pop("login_id")
            for i in serializer.data:
                #removing the login id from fields being returned to the client
                i.pop("login_id") 
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




@api_view(['POST'])
def getStaffTests(request):
    """
        To return user specific test present in the database created by staff member
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = Decriptor(token)
    if dtc:
        items = Tests.objects.filter(
            login_id = dtc.get("id"),
            course_id = None,
            )
        if items.exists():
            serializer = TestsSerializer(items,many ="True")
            #serializer.data.pop("login_id")
            for i in serializer.data:
                #removing the login id from fields being returned to the client
                i.pop("login_id") 
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



@api_view(['POST'])
def addModule(request):
    """
        To add a module to the database  
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.pop("token")
    dtc = Decriptor(token)
    if dtc:
        module_x = Course_Modules.objects.filter(
            module_name = request.data.get("module_name"),
            course_id = request.data.get("course_id"), 
            )
        if module_x.exists():
            payload.update({
                "values": None,
                "code" : 401,
                "message" : "Module name already exists",
            })
        else:
            serializer = CourseModuleSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                payload.update({
                    "values": serializer.data,
                    "code" : 200,
                    "message" : "module was added to our records",
                })
            else:
                logmessage =""
                for i in serializer.errors:
                    logmessage= logmessage + "\ncheck " + i +" : "+ serializer.errors[i][0]
                payload.update({
                    "values": logmessage,
                    "code" : 204,
                    "message" : "something went wrong",
                })
    
    return Response(payload)



@api_view(['POST'])
def getSpecificModule(request):
    """
        To return user specific module present in the database created by staff member
    """
    print(request.data,"find me please")
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = TokenValidator(token)
    if dtc:
        items = Course_Modules.objects.filter( module_id = request.data.get("module_id"))
        if items.exists():
            serializer = CourseModuleSerializer(items,many =True)
            payload.update({
                "values": (serializer.data)[0],
                "code" : 200,
                "message" : None,
            })
            return Response(payload)
        else:
            payload.update({
                "values": None,
                "code" : 204,
                "message" : "No module",
            })
            return Response(payload)
    return Response(payload)



@api_view(['POST'])
def getCourseModule(request):
    """
        To return user course module present in the database created by staff member
    """
    payload = {
            "values": None,
            "code" : 203,
            "message" : "token error",
    }
    token = request.data.get("token")
    dtc = Decriptor(token)
    if dtc:
        items = Course_Modules.objects.filter(course_id = request.data.get("course_id"))
        if items.exists():
            serializer = CourseModuleSerializer(items,many ="True")
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
                "message" : "No modules",
            })
            return Response(payload)
    return Response(payload)


# @api_view(['POST'])
# def addQuestion(request):
#     """
#         To add quetion to the database
#         takes in quetion and an string of answers
#     """
#     payload = {
#             "values": None,
#             "code" : 203,
#             "message" : "token error",
#     }
#     token = request.data.get("token")
#     dtc = TokenValidator(token)
#     if dtc:
#         quetion_builder = {
#             "test_id": request.data.get("test_id"),
#             "question": request.data.get("question"),
#         }
#         quetion_x = QuetionBankSerializer(data = quetion_builder)
#         if quetion_x.is_valid():
#             quetion_x.save()
#             for i in request.data.options:
#                 option_builder ={
#                     "question_id" : quetion_x.get("question_id")
#                     ""
#                 }
        
    #     items = Question_Bank.objects.filter(que = request.data.get("course_id"))
    #     if items.exists():
    #         serializer = CourseModuleSerializer(items,many ="True")
    #         payload.update({
    #             "values": serializer.data,
    #             "code" : 200,
    #             "message" : None,
    #         })
    #         return Response(payload)
    #     else:
    #         payload.update({
    #             "values": None,
    #             "code" : 204,
    #             "message" : "No modules",
    #         })
    #         return Response(payload)
    # return Response(payload)




