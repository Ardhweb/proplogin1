from rest_framework.routers import SimpleRouter
from  account.api.views import UserViewSet

'''centerlized routing process to  create endpoint'''
router = SimpleRouter()
router.register(r'user', UserViewSet, basename='user')
''' added each new app , api routes viewset to  include as routing endpoint '''

urlpatterns = router.urls
