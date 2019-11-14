from faker import Faker
from graphene_django.utils.testing import (
    GraphQLTestCase as GrapheneDjangoGraphQLTestCase,
)
from graphql_jwt.testcases import (
    JSONWebTokenTestCase as GraphqlJWTJSONWebTokenTestCase,
)

from doppelganger.schema import schema


fake = Faker()


class GraphQLTestCase(GrapheneDjangoGraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    GRAPHQL_URL = '/graphql'


class JSONWebTokenTestCase(GraphqlJWTJSONWebTokenTestCase):
    pass


# TODO: Refactor into factory provider?
def fake_question(_):
    """
    Use like:
    ```text = factory.LazyAttribute(fake_question)```
    """
    question = fake.paragraph(nb_sentences=2).rstrip('.')
    return f'{question}?'


no_permission_error = 'You do not have permission to perform this action'
