"""doppelganger URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from graphene_django.views import (
    GraphQLView as GrapheneDjangoGraphQLView,
)
from graphql_jwt.decorators import jwt_cookie


class GraphQLView(GrapheneDjangoGraphQLView):
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        response = self._delete_cookies_on_response_if_needed(request, response)
        return response

    def _delete_cookies_on_response_if_needed(self, request, response):
        data = self.parse_body(request)
        operation_name = self.get_graphql_params(request, data)[2]

        if operation_name and operation_name == 'Logout':
            response.delete_cookie('JWT')

        return response


urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql', jwt_cookie(GraphQLView.as_view(graphiql=True))),
]
