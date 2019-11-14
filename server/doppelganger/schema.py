import graphene
import graphql_jwt

import comparison.schema
import question.schema
import user.schema


class Query(
    comparison.schema.Query,
    question.schema.Query,
    user.schema.Query,
    graphene.ObjectType,
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(
    question.schema.Mutation,
    user.schema.Mutation,
    graphene.ObjectType,
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
