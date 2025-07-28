from rest_framework.routers import SimpleRouter
from  account.api.views import UserViewSet,UserRegisterViewSet,LoginViewSet

'''centerlized routing process to  create endpoint'''
router = SimpleRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'user/register', UserRegisterViewSet,basename='user-register')
router.register(r'user/login', LoginViewSet,basename='user-login')
''' added each new app , api routes viewset to  include as routing endpoint '''

urlpatterns = router.urls
