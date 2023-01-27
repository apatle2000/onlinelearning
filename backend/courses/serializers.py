from rest_framework import serializers
from courses.models import Courses, Course_Modules, Tests, Question_Bank, Options


class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Courses
        fields = "__all__"


class CourseModuleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course_Modules
        fields = "__all__"


class TestsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tests
        fields = "__all__"


class QuetionBankSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Question_Bank
        fields = "__all__"


class OptionsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Options
        fields = "__all__"