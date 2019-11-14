from io import StringIO
from django.test import TestCase
from django.core.management import call_command


class BootstrapFixturesTestCase(TestCase):
    def test_command_runs_without_raising_error(self):
        out = StringIO()

        try:
            call_command('bootstrap_fixtures', stdout=out)
        except Exception:
            self.fail('Should not raise exception.')
