#!/bin/bash

# This command requires `jq` to be installed

kubectl create namespace {{ cookiecutter.kubernetes_base_namespace }}
kubectl create namespace {{ cookiecutter.kubernetes_staging_namespace }}
kubectl create namespace {{ cookiecutter.kubernetes_production_namespace }}

# Need to create secret for each namespace we will run pods in
kubectl create secret docker-registry gcr-json-key \
  --namespace {{ cookiecutter.kubernetes_project }} \
  --docker-server={{ cookiecutter.docker_registry_hostname }} \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl create secret docker-registry gcr-json-key \
  --namespace {{ cookiecutter.kubernetes_staging_namespace }} \
  --docker-server={{ cookiecutter.docker_registry_hostname }} \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl create secret docker-registry gcr-json-key \
  --namespace {{ cookiecutter.kubernetes_production_namespace }} \
  --docker-server={{ cookiecutter.docker_registry_hostname }} \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl patch serviceaccount default \
  -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo update
helm dependency update ./kubernetes/{{ cookiecutter.kubernetes_project }}
helm install nginx-ingress stable/nginx-ingress --set controller.publishService.enabled=true
helm install stable/nfs-server-provisioner --generate-name --version 0.4.0
./kubernetes/kubernetes_add_service_account_kubeconfig.sh github {{ cookiecutter.kubernetes_project }}
