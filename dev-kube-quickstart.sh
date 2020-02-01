#!/bin/bash

kubectl create namespace doppelganger
kubectl create secret docker-registry gcr-json-key \
  --namespace doppelganger \
  --docker-server=gcr.io \
  --docker-username=_json_key \
  --docker-password="$(cat ./json-key-file.json)" \
  --docker-email=any@valid.email

kubectl patch serviceaccount default \
  -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
helm repo update
helm dependency update ./kubernetes/doppelganger
helm install stable/nfs-server-provisioner --generate-name --version 0.4.0
helm install doppelganger ./kubernetes/doppelganger --namespace=doppelganger
