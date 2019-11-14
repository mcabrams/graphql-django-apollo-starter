from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from user_profile.tests.factories import UserProfileFactory


class Command(BaseCommand):
    help = '''
    Generate some sample data meant to be used for local interaction with the
    server - not mean to be use for unit/integration tests.
    '''

    def handle(self, *args, **options):
        # create a superuser
        user = get_user_model().objects.create_superuser(
            username='superuser',
            email='superuser@example.com',
            password='foobar1234')
        UserProfileFactory(user=user)

        # create a normal user
        UserProfileFactory(
            user__email='normalUser@example.com',
            user__password='foobar1234',
        )
