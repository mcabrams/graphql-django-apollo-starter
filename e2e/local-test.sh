#!/bin/bash
# Expected to be run outside of docker.  Tests outside docker.  Can be useful
# for debugging situations where tests fail in docker cypress setup, and also
# allows full interaction in client side chrome/cypress - Probably need to
# disable CSRF middleware, as login approach fails there, currently.

if ! [[ -x "$(command -v cypress)" ]]; then
  echo 'Error: Cypress is not installed. Please install it first before running.' >&2
  exit 1
fi

docker-compose up -d
docker-compose exec server python manage.py bootstrap_fixtures
cd e2e
CYPRESS_baseUrl=http://localhost:8080 CYPRESS_SERVER_GRAPHQL_URL=http://localhost:8000/graphql cypress open
