from graphene_django.types import DjangoObjectType
from . import models


class UserProfileType(DjangoObjectType):
    class Meta:
        model = models.UserProfile
        fields = ('id', 'pk', 'user')
