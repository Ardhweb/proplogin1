from rest_framework.routers import SimpleRouter
from  account.api.views import UserViewSet,UserRegisterViewSet

'''centerlized routing process to  create endpoint'''
router = SimpleRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'auth/register', UserRegisterViewSet,basename='auth-register')
''' added each new app , api routes viewset to  include as routing endpoint '''

urlpatterns = router.urls
