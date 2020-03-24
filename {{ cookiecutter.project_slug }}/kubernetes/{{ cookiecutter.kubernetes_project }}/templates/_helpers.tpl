{{ "{{" }}/* vim: set filetype=mustache: */{{ "}}" }}
{{ "{{" }}/*
Expand the name of the chart.
*/{{ "}}" }}
{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.name" -{{ "}}" }}
{{ "{{" }}- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -{{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/{{ "}}" }}
{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.fullname" -{{ "}}" }}
{{ "{{" }}- if .Values.fullnameOverride -{{ "}}" }}
{{ "{{" }}- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -{{ "}}" }}
{{ "{{" }}- else -{{ "}}" }}
{{ "{{" }}- $name := default .Chart.Name .Values.nameOverride -{{ "}}" }}
{{ "{{" }}- if contains $name .Release.Name -{{ "}}" }}
{{ "{{" }}- .Release.Name | trunc 63 | trimSuffix "-" -{{ "}}" }}
{{ "{{" }}- else -{{ "}}" }}
{{ "{{" }}- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -{{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}/*
Create chart name and version as used by the chart label.
*/{{ "}}" }}
{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.chart" -{{ "}}" }}
{{ "{{" }}- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -{{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}/*
Common labels
*/{{ "}}" }}
{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.labels" -{{ "}}" }}
helm.sh/chart: {{ "{{" }} include "{{ cookiecutter.kubernetes_project }}.chart" . {{ "}}" }}
{{ "{{" }} include "{{ cookiecutter.kubernetes_project }}.selectorLabels" . {{ "}}" }}
{{ "{{" }}- if .Chart.AppVersion {{ "}}" }}
app.kubernetes.io/version: {{ "{{" }} .Chart.AppVersion | quote {{ "}}" }}
{{ "{{" }}- end {{ "}}" }}
app.kubernetes.io/managed-by: {{ "{{" }} .Release.Service {{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}/*
Selector labels
*/{{ "}}" }}
{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.selectorLabels" -{{ "}}" }}
app.kubernetes.io/name: {{ "{{" }} include "{{ cookiecutter.kubernetes_project }}.name" . {{ "}}" }}
app.kubernetes.io/instance: {{ "{{" }} .Release.Name {{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}/*
Create the name of the service account to use
*/{{ "}}" }}
{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.serviceAccountName" -{{ "}}" }}
{{ "{{" }}- if .Values.serviceAccount.create -{{ "}}" }}
    {{ "{{" }} default (include "{{ cookiecutter.kubernetes_project }}.fullname" .) .Values.serviceAccount.name {{ "}}" }}
{{ "{{" }}- else -{{ "}}" }}
    {{ "{{" }} default "default" .Values.serviceAccount.name {{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.djangoStandardEnv" -{{ "}}" }}
env:
  - name: DJANGO_ALLOWED_HOSTS
    value: {{ "{{" }} .Values.host {{ "}}" }}
  - name: DJANGO_CORS_ORIGIN_WHITELIST
    value: {{ "{{" }} printf "http://%s" .Values.host {{ "}}" }}
  - name: DJANGO_TRUSTED_ORIGINS
    value: {{ "{{" }} .Values.host {{ "}}" }}
  - name: SENTRY_DSN
    value: {{ "{{" }} .Values.sentryDsn {{ "}}" }}
  - name: REDIS_URL
    value: redis://:{{ "{{" }} .Values.redis.password {{ "}}" }}@{{ cookiecutter.kubernetes_project }}-redis-master:6379/0
  - name: GIT_SHA
    value: {{ "{{" }} .Values.gitSha {{ "}}" }}
  - name: DATABASE_URL
    valueFrom:
      secretKeyRef:
        name: server-credentials
        key: database_url
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.appVersion" -{{ "}}" }}
{{ "{{" }} .Values.appVersion | default "latest" {{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.client.image" -{{ "}}" }}
{{ "{{" }} .Values.client.image {{ "}}" }}:{{ "{{" }}- include "{{ cookiecutter.kubernetes_project }}.appVersion" . {{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}

{{ "{{" }}- define "{{ cookiecutter.kubernetes_project }}.django.image" -{{ "}}" }}
{{ "{{" }} .Values.django.image {{ "}}" }}:{{ "{{" }}- include "{{ cookiecutter.kubernetes_project }}.appVersion" . {{ "}}" }}
{{ "{{" }}- end -{{ "}}" }}
