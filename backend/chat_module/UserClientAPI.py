from .chat_module_serializer import UserSerializer, User, CreateUserSerializer
from rest_framework import viewsets, generics, status
from .tasks import send_welcome_email, send_reset_password_email
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework_jwt.settings import api_settings
import random
import string


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


def generate_random_string():
    all_chars = list(string.digits + string.ascii_letters)
    random.shuffle(all_chars)
    code = ''.join(all_chars[:12])
    return code


class UserClientCollectionAPI(viewsets.GenericViewSet,
                              generics.ListCreateAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = []

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateUserSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        instance = serializer.save()
        send_welcome_email.delay(instance.email)

    @list_route(permission_classes=[],
                url_name='reset-password', url_path='reset-password')
    def reset_password(self, request):
        user = User.objects.get(username=self.request.data.get('username'))
        if user:
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            # TODO: create new route to generate onetime token.
            # send user email which include token in url.

            send_reset_password_email.delay(user.email, token)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
