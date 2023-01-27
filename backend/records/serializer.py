from rest_framework import serializers
from records.models import Tokens


class TokensSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tokens
        fields = "__all__"