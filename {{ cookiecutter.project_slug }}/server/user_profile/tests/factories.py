import factory

from user.tests.factories import UserFactory

from ..models import UserProfile


class UserProfileFactory(factory.DjangoModelFactory):
    class Meta:
        model = UserProfile

    user = factory.SubFactory(UserFactory)
