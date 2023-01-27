from django.db import models
from login.models import Person
from courses.models import Courses
from records.constants import field_sizes # importing constant objects to be used for values


"""
    This model will hold a record of which staff has access to which course 
"""
class Guide(models.Model):
    login_id = models.ForeignKey( Person,  on_delete = models.CASCADE )
    course_id = models.ForeignKey( Courses, on_delete = models.CASCADE )
    notes = models.CharField( max_length = field_sizes["descriptive_string"], blank = True )

    class Meta:
        db_table = "Guide"
        app_label = "staff"















