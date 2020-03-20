# Graphql Django Apollo Starter
[![Project Board](https://img.shields.io/badge/project%20board-%20-green.svg)](https://github.com/mcabrams/graphql-django-apollo-starter/projects/1)

> This reposoitory is a [cookiecutter](https://github.com/cookiecutter/cookiecutter) for new projects using a stack of Django (Python), PostgresQL, GraphQL, React, Apollo, Redux - leveraging kubernetes as well as docker compose. It is adapted from my previous repository: https://github.com/mcabrams/doppelganger.

## Usage

Install cookiecutter:
```sh
pip install cookiecutter
```

Now run cookiecutter against this repository:
```sh
cookiecutter https://github.com/mcabrams/graphql-django-apollo-starter
```

Answer the prompts with your own desired options. Here's an explanation of each.

### General options
- `project_name`: A concise name of your project
- `github_repository`: i.e. mcabrams/graphql-django-apollo-starter
- `project_slug`: You can probably keep this as the default, it will be used for the django project name and be an underscore cased version of project name.
- `kubernetes_project`: I.e. "doppelganger"
- `kubernetes_base_namespace`: **Use Default**
- `kubernetes_staging_namespace`: **Use Default**
- `kubernetes_production_namespace`: **Use Default**

### Domain names
> Prior to entering these, you'll want to decide on your domain names, and probably go and purchase them.

- `local_domain_name`: Your preferred local domain name; you'll end up adding this to `/etc/hosts` locally to reach your local dev site within kubernetes.
- `domain_name`: Your production domain, i.e. "graphql-django-apollo-starter.club"
- `production_domain_name`: **Use Default** (will just use `domain_name` value)
- `staging_domain_name`: Your staging domain, i.e. "staging.graphql-django-apollo-starter.club"


### Docker registry
> Prior to entering these, you'll want to set up a docker image repository. I recommend gcr.io.  You'll want to enter your values based on the docker registry, and project name you set up.

- `docker_registry_hostname`: I.e. "gcr.io"
- `docker_registry_project_id`: I.e. "graphql-django-apollo-starter",
- `docker_registry_path`: **Use Default**


### Dependencies
- `sentry_dsn`: You'll want to set up a sentry account and copy your sentry dsn value here, it will look like: "https://19d74ebe3b174d379fbcb96310129b6b@sentry.io/1827306",
