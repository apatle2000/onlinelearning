from cryptography.fernet import Fernet
from backend.records.constants import key
import json


fed =Fernet(key)


# function to genrate token with the given parameters and takes in a dict and returns a string
def Encriptor(params):
    bt = params.encode("utf-8")
    enc = fed.encrypt(bt)
    return enc.decode()
    

def TokenValidator(params):
    pass

# function to extract the data from the token string using the key 
def Decriptor(params):
    bt = params.encode("utf-8")
    #print(bt)
    dec = fed.decrypt(bt)
    return dec.decode()


dct = {"name":"Adi", "age":4}

message =json.dumps(dct)
e = Encriptor(message)
print(e)
d= Decriptor(e)
print(d)

dct = json.loads(d)
print(dct)