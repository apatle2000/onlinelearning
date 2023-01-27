from rest_framework import serializers
from students.models import Accessed_Course, Test_Scores


class AccessedCourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Accessed_Course
        fields = "__all__"


class MyCourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Accessed_Course
        fields = ["course_id","module_num","course_name"]



class TestScoresSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Test_Scores
        fields = "__all__"


class MyTestScoresSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Test_Scores
        fields = ["test_id","percentage","certificate"]
