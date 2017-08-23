from rest_framework import routers
from chat_module.UserClientAPI import UserClientCollectionAPI
from posts.api.views import PostListCreateAPIView, PostDetailUpdateAPIView

router = routers.DefaultRouter()
router.register(r'users', UserClientCollectionAPI, base_name="users")
router.register(r'posts', PostListCreateAPIView, base_name='posts')
router.register(r'posts', PostDetailUpdateAPIView, base_name='posts')
