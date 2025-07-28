from  account.api.views import UserRegisterView,LoginView,UserDetailView
from firm.api.views import OrganizationViewSet
from django.urls import path
from rest_framework.routers import SimpleRouter

urlpatterns = [
    path('user/register/',UserRegisterView.as_view(),name="user-register"),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('login/',LoginView.as_view(),name="user-login")
]

router = SimpleRouter()
router.register(r'firm', OrganizationViewSet, basename='firm')

''' added each new app , api routes viewset to  include as routing endpoint '''

urlpatterns += router.urls