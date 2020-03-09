#!/bin/bash

# This command requires `jq` to be installed

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
