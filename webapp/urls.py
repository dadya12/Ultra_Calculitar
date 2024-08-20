from django.urls import path
from webapp.views import home

urlpatterns = [
    path('', home, name='home'),
]
