from django.db import models
from records.constants import field_sizes # importing constant objects to be used for values


class Person( models.Model ):
    """
        The base model from which defines a user is a student,  admin or staff
    """
    first_name = models.CharField( max_length = field_sizes["name_string"],  blank = False )
    last_name = models.CharField( max_length = field_sizes["name_string"],  null=True)
    login_id = models.AutoField(primary_key=True)
    username = models.CharField( max_length = field_sizes["name_string"], unique = True, null = False,  blank = False ) 
    password = models.TextField( null = False, blank = False )
    email = models.EmailField( null = True,  blank = False,  unique = True )
    contact_number  = models.CharField( max_length = field_sizes["phone_string"], null = True, default = "" ) 
    date_of_birth = models.DateField( null = True )
    display_picture = models.ImageField( null = True )
    gender = models.CharField( max_length = field_sizes["name_string"], null=True )
    active_status = models.BooleanField( null = False, default = True )
    roll = models.CharField(max_length=15,default="student",blank=False)
    description = models.TextField( max_length = field_sizes["descriptive_string"], null = True )
    #token = models.TextField (null = True )

    class Meta:
        db_table = "Person"
        app_label = "login"

