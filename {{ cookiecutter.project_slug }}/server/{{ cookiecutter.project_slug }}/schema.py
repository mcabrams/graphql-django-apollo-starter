from django.conf import settings
import graphene
import graphql_jwt

import user.schema


class AppInformation(graphene.ObjectType):
    git_sha = graphene.String()


class AppInformationQuery(graphene.ObjectType):
    app_information = graphene.Field(AppInformation)

    def resolve_app_information(parent, info):
        return {
            'git_sha': settings.GIT_SHA,
        }


class Query(
    user.schema.Query,
    AppInformationQuery,
    graphene.ObjectType,
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(
    user.schema.Mutation,
    graphene.ObjectType,
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
