from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from auth_app.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate(self, attrs):
        # Remove confirm_password from attrs before creating user
        attrs.pop('confirm_password', None)
        return attrs



    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['username'] = user.username
        token['is_staff'] = user.is_staff  # Add admin status to token

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({
            'email': self.user.email,
            'username': self.user.username,
            'is_staff': self.user.is_staff  # Include in response too
        })

        return data