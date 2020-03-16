{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "doppelganger.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "doppelganger.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "doppelganger.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "doppelganger.labels" -}}
helm.sh/chart: {{ include "doppelganger.chart" . }}
{{ include "doppelganger.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "doppelganger.selectorLabels" -}}
app.kubernetes.io/name: {{ include "doppelganger.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "doppelganger.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "doppelganger.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}

{{- define "doppelganger.djangoStandardEnv" -}}
env:
  - name: DJANGO_ALLOWED_HOSTS
    value: {{ .Values.host }}
  - name: DJANGO_CORS_ORIGIN_WHITELIST
    value: {{ printf "http://%s" .Values.host }}
  - name: DJANGO_TRUSTED_ORIGINS
    value: {{ .Values.host }}
  - name: SENTRY_DSN
    value: {{ .Values.sentryDsn }}
  - name: REDIS_URL
    value: redis://:{{ .Values.redis.password }}@doppelganger-redis-master:6379/0
  - name: DATABASE_URL
    valueFrom:
      secretKeyRef:
        name: server-credentials
        key: database_url
{{- end -}}

{{- define "doppelganger.appVersion" -}}
{{ .Values.appVersion | default "latest" }}
{{- end -}}

{{- define "doppelganger.client.image" -}}
{{ .Values.client.image }}:{{- include "doppelganger.appVersion" . }}
{{- end -}}

{{- define "doppelganger.django.image" -}}
{{ .Values.django.image }}:{{- include "doppelganger.appVersion" . }}
{{- end -}}
