from django.db import models
from login.models import Person
from courses.models import Courses, Tests
#from records.constants import field_sizes # importing constant objects to be used for values




"""
    This model holds the records of all the accessed cources of a Users
"""
class Accessed_Course( models.Model ):
    login_id = models.ForeignKey( Person,  on_delete = models.CASCADE )
    course_id = models.ForeignKey( Courses, on_delete = models.CASCADE )
    course_name = models.TextField(null=True)
    module_num = models.PositiveSmallIntegerField( null = True )

    class Meta:
        db_table = "Accessed_Course"
        app_label = "students"










"""
    This model will hold records of all the test_scoures a Users has taken
"""
class Test_Scores( models.Model ):
    
    login_id = models.ForeignKey( Person, on_delete = models.CASCADE )
    test_id = models.ForeignKey( Tests, on_delete = models.CASCADE )
    percentage = models.SmallIntegerField( null = True )
    certificate = models.ImageField( null = False )
    
    class Meta:
        db_table = "Test_Scores"
        app_label = "students"
