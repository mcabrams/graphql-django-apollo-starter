# Graphql Django Apollo Starter
[![Project Board](https://img.shields.io/badge/project%20board-%20-green.svg)](https://github.com/mcabrams/graphql-django-apollo-starter/projects/1)

This repository picks up where I left off in my previous repository: https://github.com/mcabrams/doppelganger (hence the lingering doppelganger references).

> While this repository is not yet in template form (see https://github.com/mcabrams/graphql-django-apollo-starter/issues/66), it is intended to be a starting point for new projects using a stack of Django (Python), PostgresQL, GraphQL, React, Apollo, Redux - leveraging kubernetes as well as docker compose.

## Starting a new project based off this

- Fork a new repo based off of this.
- Do a grep for `doppelganger` and `graphql-django-apollo-starter` and replace
each with desired app name. Make sure to do case insensitive search.
- Create a new google cloud project with your new app name.
- Create a new service account for the google cloud project, and generate a new
json key file, follow steps here (roughly):
  - https://blog.container-solutions.com/using-google-container-registry-with-kubernetes
  - http://docs.heptio.com/content/private-registries/pr-gcr.html
  - Rename the file to json-key-file.json and place in repo's root directory.
- Create a new sentry project, and save dsn value.
- Copy .env.example in root directory and in client directory to .env in
respective directories and set SENTRY_DSN value to dsn value saved above.
- Setup following secrets in github repo's secrets:
    - Keys will be:
      - SENTRY_DSN
- Enable renovatebot

## Development Setup

### Docker Compose

```sh
docker-compose build
docker-compose up -d
```

Open localhost:8080 in your browser.

## Development Host Side Notes

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
docker build ./server/ -t doppelganger_server
docker tag doppelganger_server:latest gcr.io/graphql-django-apollo-starter/server:latest
docker push gcr.io/graphql-django-apollo-starter/server:latest
docker build . -f client/Dockerfile -t doppelganger_client
docker tag doppelganger_client:latest gcr.io/graphql-django-apollo-starter/client:latest
docker push gcr.io/graphql-django-apollo-starter/client:latest
```
(https://cloud.google.com/container-registry/docs/pushing-and-pulling)


## Kubernetes Locally

### Begin here if setting up first time

Set up kubernetes, minikube, etc.  Start minikube.

You'll probably want to config minikube to have 8192mb of memory, and
default it to using vm-driver (i.e. virtualbox).

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
./dev-kube-quickstart.sh
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

If you make changes to kubernetes manifest yaml files, you can run something like
`helm upgrade -n doppelganger doppelganger ./kubernetes/doppelganger/ --version=0.2.0`
in order to update the helm chart and kubernetes resources in the cluster.

## Proposed CI

Build images with tag of git sha
Push to container registry
Run tests (referring to pulled image sha matching commit)
If review app, check to see if pushed commit is in pull request/branch, if it is
update images

## Deployment
### Digital Ocean

Sign up and create a new project, and then create a new kubernetes cluster and
get that and `doctl` setup per their instructions.

Make sure you've set your context to be the correct DO cluster, i.e.:

```sh
$ kubectl config get-contexts
CURRENT   NAME                                        CLUSTER                                     AUTHINFO                                          NAMESPACE
          do-sfo3-k8s-graphql-django-apollo-starter   do-sfo3-k8s-graphql-django-apollo-starter   do-sfo3-k8s-graphql-django-apollo-starter-admin
*         minikube                                    minikube                                    minikube

$ kubectl config use-context do-sfo3-k8s-graphql-django-apollo-starter
Switched to context "do-sfo3-k8s-graphql-django-apollo-starter".
```

To deploy first time run (make sure to set `host` in staging.values.yaml to
your desired host name - i.e. the domain you will purchase later, or perhaps
have already purchased):
```sh
kubectl create namespace doppelganger
kubectl create namespace staging-doppelganger
kubectl create namespace production-doppelganger
kubectl create secret docker-registry gcr-json-key \
  --namespace doppelganger \
  --docker-server=gcr.io \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl patch serviceaccount default \
  -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo update
helm dependency update ./kubernetes/doppelganger
helm install nginx-ingress stable/nginx-ingress --set controller.publishService.enabled=true
helm install stable/nfs-server-provisioner --generate-name --version 0.4.0
./kubernetes/kubernetes_add_service_account_kubeconfig.sh github doppelganger
```

That last line will output a path to a kubeconfig that you'll want to save
for the next step.

You'll then want to add your gcloud authentication and kubeconfig info to github
secrets.  Enter the following secrets in github:

- `KUBECONFIG`
  - (This can be retreived from the path that is output from the last command
      that ran).

- `GCP_SA_KEY`
  - (Create from
      https://console.cloud.google.com/apis/credentials/serviceaccountkey,
      you'll probably want to create a new service account with role storage admin
      and name of something like github-storage-admin -
      download the json file and copy output from `cat
      ~/Downloads/graphql-django-apollo-starter-e114e5df1222.json | base64` -
      you'll need to replace that filename with one you downloaded)

- `GCP_SA_EMAIL`
  - Use your client email associated with the key you generated. You could run
  `cat ~/Downloads/graphql-django-apollo-starter-e114e5df1222.json` (remember
  to change file name as usual) and look for client_email entry to see it.

You can run

```sh
kubectl get services --namespace=doppelganger -o wide -w nginx-ingress-controller
```

in order to find the external ip of the nginx ingress.

Copy the created service account into your GitHub repository secrets with the
name `KUBECONFIG` (this comes from the previously run `./kubernetes/kubernetes_add_service_account_kubeconfig.sh` script).

Purchase a new domain, perhaps on namecheap.com.  Go ahead and setup digital ocean
name servers so things can be configured through DO.  This guide is helpful:
https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars

Once that has successfully propagated, you can set up a new A root record that
directs to the load balance previously shown as the external-ip for the command:
```sh
kubectl get services --namespace=doppelganger -o wide -w nginx-ingress-controller
```
(you should see a load balancer with that IP listed in the digital ocean dropdown)

## Notes
- TBD
