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

Quickstart (if killed minikube and already created secrets files):

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
kubectl apply -f ./kubernetes/database
kubectl apply -f ./kubernetes/server
kubectl apply -f ./kubernetes/ingress.yaml
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

Set up kubernetes, minikube, etc.  Start minikube.

Setup secret for access to private docker images.  Make sure to appropriately
setup authorization according to registry being used (i.e. gcr via gcloud).
Examples here for how to generate json file (move to ./json-key-file.json).

```sh
kubectl create secret docker-registry gcr-json-key \
  --namespace doppelganger \
  --docker-server=gcr.io \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl patch serviceaccount default \
  -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
```

```sh
kubectl create namespace doppelganger
```

Encode database secrets

```sh
# username
echo -n 'postgresadmin' | base64
# password
echo -n 'admin123' | base64
```

Create a `secrets.yaml` in `./kubernetes/database` and fill in like

```
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: doppelganger
type: Opaque
data:
  user: # fill in user_encoded
  password: # fill in password_encoded
```

```sh
kubectl apply -f ./kubernetes/database
```

Encode server secrets

```sh
# database_url
echo -n 'postgresql://postgresadmin:admin123@database-service:5432/postgresdb' | base64
```

Create a `secrets.yaml` in `./kubernetes/server` and fill in like

```
apiVersion: v1
kind: Secret
metadata:
  name: server-credentials
  namespace: doppelganger
type: Opaque
data:
  database_url: # fill in database_url_encoded
```

```sh
kubectl apply -f ./kubernetes/server
```


```sh
# create a GCP service account; format of account is email address
SA_EMAIL=$(gcloud iam service-accounts --format='value(email)' create k8s-gcr-auth-ro)
# create the json key file and associate it with the service account
gcloud iam service-accounts keys create k8s-gcr-auth-ro.json --iam-account=$SA_EMAIL
# get the project id
PROJECT=$(gcloud config list core/project --format='value(core.project)')
# add the IAM policy binding for the defined project and service account
gcloud projects add-iam-policy-binding $PROJECT --member serviceAccount:$SA_EMAIL --role roles/storage.objectViewer
```

if `.docker` is in home directory:
```sh
SECRETNAME=regcred

kubectl create secret docker-registry $SECRETNAME \
  --namespace prisma \
  --docker-server=https://gcr.io \
  --docker-username=_json_key \
  --docker-email=mcabrams1@gmail.com.com \
  --docker-password="$(cat k8s-gcr-auth-ro.json)"
```

Add the secret to the Kubernetes configuration.
You can add it to the default service account with the following command:

```sh
SECRETNAME=regcred

kubectl patch serviceaccount default \
  -n prisma \
  -p "{\"imagePullSecrets\": [{\"name\": \"$SECRETNAME\"}]}"
```

Then deploy manifests either with kubectl or skaffold


### Option 1: skaffold

```sh
# This first line is necessary to apply the name space
kubectl apply -f .
skaffold dev --port-forward
```

### Options 2: kubectl

```sh
kubectl apply -f .
kubectl apply -f ./server/
kubectl apply -f ./database/
kubectl apply -f ./prisma/
```

Note: You can skip below if you opted for skaffold!

------ SKIPPABLE W/ SKAFFOLD -------

Find the pod to exec prisma deploy and generate

```sh
kubectl get pods -n prisma
```

Which will return something like

```sh
NAME                        READY   STATUS    RESTARTS   AGE
database-657f469468-frg5j   1/1     Running   0          3h49m
prisma-6d4fbf99b4-6t29g     1/1     Running   0          3h49m
server-5b9454995c-pr8pf     1/1     Running   0          5m42s
```

Port forward the prisma instance

`kubectl port-forward -n prisma <the-pod-name> 4467:4466` – This will
forward from `127.0.0.1:4467` -> `kubernetes-cluster:4466`

------ END SKIPPABLE W/ SKAFFOLD -------

The Prisma server is now reachable via `http://localhost:4467`. This is the
actual `endpoint` we have specified in `.local.env`. We can now deploy
`prisma` and deploy to stage `production`, at:
`http://localhost:4467/prisma/production`.

If you haven't already, install prisma on host:
```sh
npm install -g prisma
```

With this in place, we can deploy the Prisma service via the Prisma CLI
(`cd server; prisma deploy -e .local.env`) as long as the port
forwarding to the cluster is active.`

<!-- Then exec sh on server pod and deploy prisma -->

<!-- ```sh -->
<!-- kubectl exec -it -n prisma server-5b9454995c-pr8pf /bin/sh -->
<!-- ./node_modules/.bin/prisma deploy -->
<!-- ./node_modules/.bin/prisma generate -->
<!-- ``` -->


Open server in browser
```sh
minikube service -n prisma server
```

Open client in browser
```sh
minikube service -n prisma client
```


You'll need to add /graphql to get to the graphql playground

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
