# {{ cookiecutter.project_name }}
[![Project Board](https://img.shields.io/badge/project%20board-%20-green.svg)](https://github.com/{{ cookiecutter.github_repository }}/projects/1)

> Created from [graphql-django-apollo-starter](https://github.com/mcabrams/graphql-django-apollo-starter)

## Development Setup

### Docker Compose

```sh
docker-compose build
docker-compose up -d
```

Open localhost:8080 in your browser.

## Development Host Side Notes

Running `docker-compose up -d` starts the client in watch mode, so updates you make will not require building assets manually.

When developing for the client, you'll want to run `npm run generate` or `npm run generate:watch` on the host from the `client` directory to ensure that you can see the generated graphql-codegen files (which are excluded from syncing to host via use of a named volume).

Additionally, if you want things like linting and typechecking to work on the host side, feel free to run `npm install` from host (in `server/` or `client/`) directory on the host.  It will generate node_modules, presumably identical to inside the server container, and won't overwrite those through skaffold nor docker compose.

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
make build push
```
(https://cloud.google.com/container-registry/docs/pushing-and-pulling)


## Kubernetes Locally

### Begin here if setting up first time

Set up kubernetes, minikube, helm, etc.  Start minikube.

You'll probably want to config minikube to have 8192mb of memory, and
default it to using vm-driver (i.e. virtualbox).

```sh
# this line is necessary
minikube addons enable ingress
# this is optional
minikube config set memory 8192
```

You'll want to grab the gcr json key by creating a service account in google
cloud (along with corresponding project, first) and downloading the json key
file.  Move this to the root repository directory and name it
`json-key-file.json`.

### Quickstart (if killed minikube and already created secrets files):

```sh
./dev-kube-quickstart.sh
kubectl get -n {{ cookiecutter.kubernetes_project }} ingresses.extensions -w
```

Once address is populated, add it to your `/etc/hosts`

i.e.

```sh
NAME             HOSTS                ADDRESS   PORTS   AGE
server-ingress   {{ cookiecutter.local_domain_name }}             80      12s
server-ingress   {{ cookiecutter.local_domain_name }}   192.168.99.121   80      33s
```

would mean you should add this line to `/etc/hosts`:

```
192.168.99.121 {{ cookiecutter.local_domain_name }}
```

If you make changes to kubernetes manifest yaml files, you can run something like
`helm upgrade -n {{ cookiecutter.kubernetes_project }} {{ cookiecutter.kubernetes_project }} ./kubernetes/{{ cookiecutter.kubernetes_project }}/ --version=0.2.0`
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
          do-sfo3-k8s-{{ cookiecutter.kubernetes_project }}   do-sfo3-k8s-{{ cookiecutter.kubernetes_project}}   do-sfo3-k8s-{{ cookiecutter.kubernetes_project }}-admin
*         minikube                                    minikube                                    minikube

$ kubectl config use-context do-sfo3-k8s-{{ cookiecutter.kubernetes_project }}
Switched to context "do-sfo3-k8s-{{ cookiecutter.kubernetes_project }}".
```

To deploy first time:
- install jq (i.e. `berw install jq`)
- run (make sure to set `host` in staging.values.yaml to
your desired host name - i.e. the domain you will purchase later, or perhaps
have already purchased):
```sh
./first-deploy-quickstart.sh
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
      ~/Downloads/{{ cookiecutter.kubernetes_project }}-e114e5df1222.json | base64` -
      you'll need to replace that filename with one you downloaded)

- `GCP_SA_EMAIL`
  - Use your client email associated with the key you generated. You could run
  `cat ~/Downloads/{{ cookiecutter.kubernetes_project }}-e114e5df1222.json` (remember
  to change file name as usual) and look for client_email entry to see it.

You can run

```sh
kubectl get services -o wide -w nginx-ingress-controller
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
kubectl get services -o wide -w nginx-ingress-controller
```
(you should see a load balancer with that IP listed in the digital ocean dropdown).

You'll want to create records for staging and production appropriately.
You can use that same ip for other A records (for example: {{ cookiecutter.staging_domain_name }})

## Notes
- TBD
