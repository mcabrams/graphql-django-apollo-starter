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
from django.conf import settings
from django.urls import include, path
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView

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
    path('api/graphql', jwt_cookie(GraphQLView.as_view(graphiql=True))),
    path('robots.txt', cache_page(settings.CACHE_TTL)(TemplateView.as_view(
        template_name='robots.txt',
        content_type='text/plain',
    ))),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
