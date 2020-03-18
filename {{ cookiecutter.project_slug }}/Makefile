SHELL := bash

DOCKER_REPOSITORY := {{ cookiecutter.docker_registry_hostname }}
PROJECT_NAME      := {{ cookiecutter.docker_registry_project_id }}
SERVER_NAME       := ${DOCKER_REPOSITORY}/${PROJECT_NAME}/server
CLIENT_NAME       := ${DOCKER_REPOSITORY}/${PROJECT_NAME}/client
TAG               := ${shell git log -1 --pretty=%H}
SERVER_IMG        := ${SERVER_NAME}:${TAG}
CLIENT_IMG        := ${CLIENT_NAME}:${TAG}

build:
	@docker build ./server/ -t ${SERVER_IMG}
	@docker tag ${SERVER_IMG} ${SERVER_NAME}:latest
	@docker build . -f client/Dockerfile -t ${CLIENT_IMG}
	@docker tag ${CLIENT_IMG} ${CLIENT_NAME}:latest

push:
	@docker push ${CLIENT_NAME}
	@docker push ${SERVER_NAME}

login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}
