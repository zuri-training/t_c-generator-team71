from rest_framework import serializers

from .models import User

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken

from p_p.serializers import GetPrivacyPolicySerializer
from t_c.serializers import GetTCSerializer


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    tokens = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email',
            'id',
            'tokens',
            'password'
        ]

    def get_tokens(self, user):
        user_tokens = RefreshToken.for_user(user)
        refresh = str(user_tokens)
        access = str(user_tokens.access_token)
        data = {
            "refresh": refresh,
            "access": access
        }
        return data

    def create(self, validated_data):
        user = User.objects.create_user(validated_data.get('email'),
                                        validated_data.get('password'),
                                        first_name=validated_data.get('first_name'),
                                        last_name=validated_data.get('last_name'))
        return user


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email',
            'id',
        ]


class GetUserDocumentsSerializer(serializers.ModelSerializer):
    terms = GetTCSerializer(many=True)
    privacy_policies = GetPrivacyPolicySerializer(many=True)

    class Meta:
        model = User
        fields = [
            'id',
            'privacy_policies',
            'terms'
        ]


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,
                                     required=True,
                                     validators=[validate_password])
    new_password = serializers.CharField(write_only=True,
                                         required=True,
                                         validators=[validate_password])
    return_data = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['password',
                  'new_password',
                  'return_data']

    def validate(self, data):
        if not self.context['request'].user.check_password(data.get('password')):
            raise serializers.ValidationError({'password': 'incorrect old password'})
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

    def get_return_data(self, data):
        return {'success': True}
