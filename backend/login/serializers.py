from rest_framework import serializers
from login.models import Person


class PersonSerializer(serializers.ModelSerializer):
    """
        The PersonSerializer is for getting all data and serializing all data
    """
    class Meta:
        model = Person
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    """
        The UserSerializer is for getting selected data and serializing selected data
        basiclly leaving out password field
    """
    class Meta:
        model = Person
        fields = ["first_name","last_name","username","email","contact_number","gender","active_status","roll"]