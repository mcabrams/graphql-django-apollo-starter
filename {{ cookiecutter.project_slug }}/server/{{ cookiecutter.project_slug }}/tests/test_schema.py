import json

from django.test import override_settings

from tests.helpers import GraphQLTestCase


class AppInformationTestcase(GraphQLTestCase):
    @override_settings(GIT_SHA='foo')
    def test_returns_app_version_from_settings(self):
        response = self.query(
            '''
            query {
                appInformation {
                    gitSha
                }
            }
            '''
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEqual(content['data']['appInformation']['gitSha'], 'foo')
