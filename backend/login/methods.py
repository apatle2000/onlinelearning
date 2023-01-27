"""
This file is to store a set of all the methods (functions) being used in the project
and are highly related and used in the login app and also stores the constants being used
"""

##### dependencies

from django.contrib.auth.hashers import make_password, check_password #importing objects for password managment 
from records.constants import field_sizes, special_charecters_list


##### methords

def hash_password(plaintext):
    # method to take in plain text and return an hash value
    return make_password(plaintext)


def authenticate_password( user_text , password_hash):
    # method to authenticate the password by checking if the text entered has the same hash value as the one sugested
    return check_password( user_text , password_hash )  # returns True if correct else false

def check_password(text1):
    # method to check if the password parameters are being fullfilled or not. 
    # fields like having a capital letter, a number and a special charecter and the message being of a certain length 
    error_message = ""  # string to store all the errors the current password has 

    # The length checking (number of charecters)
    if len(text1)>field_sizes["max_pass_len"]:
        error_message += "Password is too big \n"
    elif len(text1)<field_sizes["min_pass_len"]:
        error_message += "Password is too small \n"
    
    has_upper = False
    has_lower = False
    has_digit = False
    has_special = False

    for i in text1:
        has_lower = has_lower or i.islower()
        has_upper = has_upper or i.isupper()
        has_digit = has_digit or i.isdigit()
        has_special = has_special or True if i in special_charecters_list else False

        if has_digit and has_special and has_lower and has_special:
            break
        
    if not has_special:
        error_message += "Password dosent contain any special charecters \n"
    if not has_digit:
        error_message += "Password dosent contain any digits \n"
    if not has_upper:
        error_message += "Password dosent contain any upper case charecters \n"
    if not has_lower:
        error_message += "Password dosent contain any lower case charecters \n"

    return error_message


    