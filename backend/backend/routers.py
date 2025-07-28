from  account.api.views import UserRegisterView,LoginView
from django.urls import path

urlpatterns = [
    path('user/register/',UserRegisterView.as_view(),name="user-register"),
    path('login/',LoginView.as_view(),name="user-login")
]

