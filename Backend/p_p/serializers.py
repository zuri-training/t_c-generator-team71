from rest_framework import serializers

from .models import PrivacyPolicy


class GetPrivacyPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicy
        fields = '__all__'
