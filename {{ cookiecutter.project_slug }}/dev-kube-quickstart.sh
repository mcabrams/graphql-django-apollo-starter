#!/bin/bash

# This script is currently specific to using minikube rather than something else like the kubernetes cluster available through docker desktop

minikube addons enable ingress
kubectl create namespace {{ cookiecutter.kubernetes_project }}
kubectl create secret docker-registry gcr-json-key \
  --namespace {{ cookiecutter.kubernetes_project }} \
  --docker-server={{ cookiecutter.docker_registry_hostname }} \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl patch serviceaccount default \
  -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo update
helm dependency update ./kubernetes/{{ cookiecutter.kubernetes_project }}
helm install stable/nfs-server-provisioner --generate-name --version 0.4.0
helm install {{ cookiecutter.kubernetes_project }} ./kubernetes/{{ cookiecutter.kubernetes_project }} --namespace={{ cookiecutter.kubernetes_project }} --set gitSha="$(git rev-parse HEAD)"
