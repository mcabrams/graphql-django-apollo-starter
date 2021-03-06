from graphene_django.utils.testing import (
    GraphQLTestCase as GrapheneDjangoGraphQLTestCase,
)
from graphql_jwt.testcases import (
    JSONWebTokenTestCase as GraphqlJWTJSONWebTokenTestCase,
)

from {{ cookiecutter.project_slug }}.schema import schema


class GraphQLTestCase(GrapheneDjangoGraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    GRAPHQL_URL = '/api/graphql'


class JSONWebTokenTestCase(GraphqlJWTJSONWebTokenTestCase):
    pass


no_permission_error = 'You do not have permission to perform this action'
