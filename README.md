# Graphql Django Apollo Starter

- Create a new repo based off of this.
- Do a grep for `doppelganger` and `graphql-django-apollo-starter` and replace
each with desired app name. Make sure to do case insensitive search.
- Create a new google cloud project with your new app name.
- Create a new sentry project, and save dsn value.
- Copy .env.example in root directory and in client directory to .env in
respective directories and set SENTRY_DSN value to dsn value saved above.
- set DSN value in environment variables for github actions (use secret)
- Enable renovatebot

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

## Building images

Make sure gcloud command line utility is installed and initiated. Make sure
you are currently on the correct cloud project (should match app name).

```sh
gcloud auth configure-docker
docker-compose build
docker tag doppelganger_server:latest gcr.io/graphql-django-apollo-starter/server:latest
docker push gcr.io/graphql-django-apollo-starter/server:latest
```
(https://cloud.google.com/container-registry/docs/pushing-and-pulling)




## Kubernetes Locally

### Begin here if setting up first time

Set up kubernetes, minikube, etc.  Start minikube.

You'll want to grab the gcr json key by creating a service account in google
cloud (along with corresponding project, first) and downloading the json key
file.  Move this to the root repository directory and name it
`json-key-file.json`.

Encode database secrets

```sh
# username
echo -n 'postgresadmin' | base64
# password
echo -n 'admin123' | base64
```

Create a `secrets.yaml` in `./kubernetes/doppelganger/templates/database` and
fill in like:

```
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
type: Opaque
data:
  user: # fill in user_encoded
  password: # fill in password_encoded
```

Encode server secrets

```sh
# database_url
echo -n 'postgresql://postgresadmin:admin123@database-service:5432/postgresdb' | base64
```

Create a `secrets.yaml` in `./kubernetes/doppelganger/templates/server` and
fill in like:

```
apiVersion: v1
kind: Secret
metadata:
  name: server-credentials
type: Opaque
data:
  database_url: # fill in database_url_encoded
```

Then run the quick start command below.


### Quickstart (if killed minikube and already created secrets files):

```sh
kubectl create namespace doppelganger
kubectl create secret docker-registry gcr-json-key \
  --namespace doppelganger \
  --docker-server=gcr.io \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl patch serviceaccount default \
  -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
helm install doppelganger ./kubernetes/doppelganger --namespace=doppelganger
kubectl get -n doppelganger ingresses.extensions -w
```

Once address is populated, add it to your `/etc/hosts`

i.e.

```sh
NAME             HOSTS                ADDRESS   PORTS   AGE
server-ingress   doppelganger.local             80      12s
server-ingress   doppelganger.local   192.168.99.121   80      33s
```

would mean you should add this line to `/etc/hosts`:

```
192.168.99.121 doppelganger.local
```

## Proposed CI

Build images with tag of git sha
Push to container registry
Run tests (referring to pulled image sha matching commit)
If review app, check to see if pushed commit is in pull request/branch, if it is
update images

## Deployment
```sh
#TODO
```
