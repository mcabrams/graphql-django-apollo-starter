#!/bin/bash

# This command is for easily generating a baked version of cookiecutter and
# starting docker-compose

rm -rf graphql_django_apollo_starter
cookiecutter --no-input .
cd graphql_django_apollo_starter
cp client/.env.example  client/.env
cp .env.example  .env
docker-compose down -v; docker-compose build; docker-compose up -d
npm install
