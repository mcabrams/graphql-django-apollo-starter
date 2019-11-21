# Graphql Django Apollo Starter

- Create a new repo based off of this.
- Do a grep for doppelganger and replace with desired app name.
- Create a new sentry project, and save dsn value.
- Copy .env.example in root directory and in client directory to .env in
respective directories and set SENTRY_DSN value to dsn value saved above.
- Enable renovatebot, and add project to CircleCI (and set DSN value in
environment variables for Circle ci from value saved above).

## Development Setup

### Docker Compose

```sh
docker-compose build
docker-compose up -d
```

Open localhost:8080 in your browser.

### Server
```sh
cd server/
docker-compose build
docker-compose up -d
```

To perform actions inside container:
```
docker-compose run server /bin/sh
```

Open http://localhost:8000/graphql


### Client
```sh
cd client/
docker-compose build
docker-compose up -d
```

To perform actions inside container:
```
docker-compose run client /bin/sh
```

Open http://localhost:8080

## Development Host Side

If you want things like linting and typechecking to work on the host side,
feel free to run `npm install` from host (in `server/` or `client/`) directory
on the host.  It will generate node_modules, presumably identical to inside the
server container, and won't overwrite those through skaffold nor docker
compose.

Additionally, when developing for the client, you'll want to run
`npm run generate` or `npm run generate:watch` on the host from the `client`
directory to ensure that you can see the generated graphql-codegen files (which
are excluded from syncing to host via use of a named volume).


## Running Tests
For tests, you'll want to use docker compose to build and run the test docker-compose
setup.  This consists of:

```sh
docker-compose -f docker-compose.yml -f docker-compose.test.yml build
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
docker-compose -f docker-compose.yml -f docker-compose.test.yml exec server-test /bin/sh
npm run test
```

## Running e2e Tests

```sh
docker-compose -f docker-compose.yml -f docker-compose.test.yml run cypress cypress run
```

or

```sh
./e2e/test.sh
```

## Deployment
```sh
#TODO
```
