import factory

from ..models import User


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user_{n}')
    email = factory.Sequence(lambda n: f'user_{n}@example.com')
    password = factory.PostGenerationMethodCall('set_password', 'password')
    is_superuser = False
    is_staff = False
    is_active = True
