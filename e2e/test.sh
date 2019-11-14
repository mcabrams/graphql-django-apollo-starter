#!/bin/bash
# Expected to be run outside of docker.  Tests within docker.
# If run with --no-cleanup arg, it's exit code matches whether tests passed or
# failed.

if [[ $1 = "--no-cleanup" ]]; then
  echo "Running with no cleanup..."
fi


docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d server-test client-test
docker-compose -f docker-compose.yml -f docker-compose.test.yml exec server-test python manage.py bootstrap_fixtures
docker-compose -f docker-compose.yml -f docker-compose.test.yml run cypress ./wait-for.sh http://client-test:8080 cypress run

if [[ $? != 0 ]] && [[ $1 = "--no-cleanup" ]]; then
  echo "Tests include a failure..." >&2
  exit 1
fi

if [[ $1 != "--no-cleanup" ]]; then
  docker-compose -f docker-compose.yml -f docker-compose.test.yml down -v
fi
