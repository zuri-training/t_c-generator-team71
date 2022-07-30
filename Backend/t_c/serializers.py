from rest_framework import serializers

from .models import Terms


class GetTCSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terms
        fields = '__all__'
