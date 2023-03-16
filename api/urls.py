from django.urls import path


from .views import *

urlpatterns = [
    path('', index),
    path('add-name', AddNameSerializer.as_view()),
    path('view-names', NamesSerializerView.as_view()),
    path('edit-name', EditNameSerializer.as_view()),
    path('get-names', GetNameSerializer.as_view()),
    path('delete-name', DeleteNameSerializer.as_view())
]