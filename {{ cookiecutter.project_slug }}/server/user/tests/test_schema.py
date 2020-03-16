import json

from django.contrib.auth import get_user_model

from tests.helpers import (
    GraphQLTestCase, JSONWebTokenTestCase,
)

from .factories import UserFactory


class CreateUserTestCase(GraphQLTestCase):
    op_name = 'createUser'
    User = get_user_model()
    username = 'foobar'
    password = 'foobar1234'
    email = 'foobar@example.com'

    def test_creating_returns_user(self):
        response = self.create_default_user()

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEqual(content['data'][self.op_name], {
            'user': {
                'email': self.email,
                'username': self.username,
            }
        })

    def test_creating_creates_user(self):
        self.create_default_user()
        matching_user = self.User.objects.filter(
            username=self.username,
            email=self.email,
        )

        self.assertEqual(matching_user.count(), 1)

    def test_creating_creates_profile_for_user(self):
        self.create_default_user()
        user = self.User.objects.get(
            username=self.username,
            email=self.email,
        )
        self.assertEqual(user.profile.user, user)

    def create_default_user(self):
        return self.create_user(
            username=self.username,
            password=self.password,
            email=self.email,
        )

    def create_user(self, username, password, email):
        query = (
            '''
            mutation CreateUser(
                $username: String!,
                $password: String!,
                $email: String!,
            ) {
                createUser(
                    username: $username, password: $password, email: $email,
                ) {
                    user {
                        email
                        username
                    }
                }
            }
            '''
        )
        return self.query(query, self.op_name, variables={
            'username': username, 'email': email, 'password': password,
        })


class UsersTestCase(GraphQLTestCase):
    op_name = 'users'

    def test_users_can_return_username(self):
        UserFactory(username='foobar')
        response = self.query(
            '''
            query {
                users {
                    edges {
                        node {
                            username
                        }
                    }
                }
            }
            ''',
            op_name='users',
        )

        content = json.loads(response.content)
        self.assertEqual(content['data'][self.op_name]['edges'], [{
            'node': {
                'username': 'foobar',
            }
        }])

    def test_attempting_to_return_password_fails(self):
        UserFactory(username='foobar')
        response = self.query_users('password')
        self.assertResponseHasErrors(response)

    def test_attempting_to_return_email_fails(self):
        UserFactory(username='foobar')
        response = self.query_users('email')
        self.assertResponseHasErrors(response)

    def query_users(self, query):
        query = (
            '''
            query {
                users {
            '''
            f'''
                    {query}
            '''
            '''
                }
            }
            '''
        )
        return self.query(query, self.op_name)


class ProtectedUsersTestCase(JSONWebTokenTestCase):
    op_name = 'protectedUsers'

    def setUp(self):
        UserFactory(username='foobar', email='foobar@example.com')

    def test_attempting_to_return_email_fails_when_unauthenticated(self):
        result = self.query_protected_users('email')
        self.assertIsNone(result.data[self.op_name])
        self.assertIsNotNone(result.errors)

    def test_attempting_to_return_email_fails_when_not_superuser(self):
        non_superuser = UserFactory(password='password')
        self.client.authenticate(non_superuser)
        result = self.query_protected_users('email')
        self.assertIsNone(result.data[self.op_name])
        self.assertIsNotNone(result.errors)

    def test_attempting_to_return_email_succeeds_when_superuser(self):
        superuser = get_user_model().objects.create_superuser(
            username='foobar2',
            email='foobar2@example.com',
            password='password')
        self.client.authenticate(superuser)
        result = self.query_protected_users('email')
        self.assertEqual(result.data[self.op_name]['edges'], [
            {
                'node': {'email': 'foobar@example.com'},
            },
            {
                'node': {'email': 'foobar2@example.com'},
            }
        ])

    def test_page_info_has_next_page_works(self):
        superuser = get_user_model().objects.create_superuser(
            username='foobar2',
            email='foobar2@example.com',
            password='password')
        self.client.authenticate(superuser)
        result = self.query_protected_users('email')
        self.assertEqual(result.data[self.op_name]['pageInfo'], {
            'hasNextPage': False,
        })

    def query_protected_users(self, query):
        query = (
            '''
            query {
                protectedUsers {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        node {
            '''
            f'''
                            {query}
            '''
            '''
                        }
                    }
                }
            }
            '''
        )
        return self.client.execute(query)
