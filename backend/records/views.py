from django.shortcuts import render
from cryptography.fernet import Fernet
import json
from records.serializer import TokensSerializer
from records.constants import key
from records.models import Tokens

#Feret key loading form constant.py
fed =Fernet(key)


# function to check if the Token exists or not
def TokenValidator(params):
    rec = Tokens.objects.filter(Tokens = params)
    if rec.exists():
        return True
    else:
        False
    

# function to genrate token with the given parameters and takes in a dict and returns a string
def EncriptorLoader(id,params):
    params["id"] = id
    params = json.dumps(params)
    bt = params.encode("utf-8")
    enc = fed.encrypt(bt)
    stenc = enc.decode()
    datadict = {"login_id":id,"Tokens":stenc}
    rec = TokensSerializer(data = datadict)
    print(rec.is_valid())
    if rec.is_valid():
        rec.save()
        return stenc
    else:
        return ""
    

# function to extract the data from the token string using the key 
def Decriptor(params):
    if params:
        bt = params.encode("utf-8")
        try:
            dec = fed.decrypt(bt)
            return json.loads(dec.decode())
        except :
            return None        
    else:
        return None


# function to delete the token from state
def DeleteToken(params):
    rec = Tokens.objects.filter(Tokens = params)
    if rec.exists():
        rec.delete()
        return True
    else:
        return False
    