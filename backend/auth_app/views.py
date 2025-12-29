from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from auth_app.models import User
from auth_app.serializers import RegisterSerializer, CustomTokenObtainPairSerializer
import logging
from rest_framework_simplejwt.views import TokenRefreshView


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        print("DEBUG: Reached RegisterView create method")
        print("DEBUG: Request data:", request.data)
        return super().create(request, *args, **kwargs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



logger = logging.getLogger(__name__)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Log the incoming request body (data)
        print("Incoming refresh token request dataaaaaaaa: ", request.data)
        print(request.headers)
        # Call the parent class's post method
        response = super().post(request, *args, **kwargs)

        return response