from django.db import models
from records.constants import field_sizes
from login.models import Person

# Create your models here.

class Courses( models.Model ):

    """
        This is the model holding the course name and primary details of the course
    """
    course_id = models.AutoField( primary_key = True)
    course_name = models.CharField( max_length = field_sizes["name_string"], unique = True )
    course_description = models.CharField( max_length = field_sizes["descriptive_string"] )
    login_id = models.ForeignKey(Person, on_delete = models.CASCADE)
    display_picture = models.ImageField( null = True )

    class Meta:
        db_table = "Courses"
        app_label = "courses"







class Tests( models.Model ):
    """
        This model will hold records of all the tests generated
    """
    test_id = models.AutoField( primary_key = True)
    test_name = models.CharField( max_length = field_sizes["name_string"] )
    login_id = models.ForeignKey(Person, on_delete = models.CASCADE)
    course_id = models.IntegerField( null=True )
    #module_id = models.ForeignKey( Course_Modules, on_delete = models.CASCADE )
    time = models.TimeField( null = True )

    class Meta:
        db_table = "Tests"
        app_label = "courses"




class Question_Bank( models.Model ):
    """
    This model will hold records all the options for a question
    """
    question_id = models.AutoField( primary_key = True)
    test_id = models.ForeignKey( Tests, on_delete = models.CASCADE )
    #course_id = models.ForeignKey( Courses, on_delete = models.CASCADE )
    #module_id = models.ForeignKey( Course_Modules, on_delete = models.CASCADE )
    question = models.TextField() 
    
    class Meta:
        db_table = "Question_Bank"
        app_label = "courses"






class Options( models.Model ):
    """
    This model will hold records all the options for a question
    """
    option_id = models.AutoField( primary_key = True)
    question_id = models.ForeignKey( Question_Bank, on_delete = models.CASCADE )
    is_correct = models.BooleanField( default = False )
    #marks_awarded = models.PositiveSmallIntegerField( default = 1 )
    #marks_deducted = models.PositiveSmallIntegerField( default = 0 )

    class Meta:
        db_table = "Options"
        app_label = "courses"






class Course_Modules( models.Model ):
    """
    This model will hold a record of all the course-modules refering to their course_id 
    """
    course_id = models.ForeignKey( Courses, on_delete = models.CASCADE )
    module_num = models.IntegerField( null = True )
    module_id = models.AutoField( primary_key = True)
    module_name = models.CharField( max_length = field_sizes["name_string"] )
    module_type = models.CharField( max_length = field_sizes["name_string"], null=False, default=" Content ")
    module_description = models.CharField( max_length = field_sizes["descriptive_string"] )
    test_id = models.ForeignKey(Tests,models.CASCADE,null=True)
    content  = models.TextField(null=True)
    #progress = models.PositiveSmallIntegerField()

    class Meta:
        db_table = "Course_Modules"
        app_label = "courses"





