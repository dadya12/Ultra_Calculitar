from django.urls import path
from count_api1.views import add, subtract, multiply, divide

app_name = 'count_api1'

urlpatterns = [
    path('add/', add, name='add'),
    path('subtract/', subtract, name='subtract'),
    path('multiply/', multiply, name='multiply'),
    path('divide/', divide, name='divide'),
]
