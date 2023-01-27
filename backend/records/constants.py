"""
This file is to store a set of all the constants being used throught the project
"""

##### dependencies

from django.contrib.auth.hashers import make_password, check_password #importing objects for password managment 


##### Constants

gender_list = ["Male", "Female","Others"]           # list to store all genders selectable 

special_charecters_list =["@", "!", "#", ".", ",", "$", "%", "^", "&", "*", "?" ]

field_sizes = {                                     # dict to hold the max size of specific strings
    "name_string":50,
    "descriptive_string":500,
    "phone_string":20,
    "min_pass_len":6,
    "max_pass_len":25,
    "hash_string":100,
}

key = b'iDJpljxUBBsacCZ50GpSBff6Xem0R-giqXXnBFGJ2Rs='

