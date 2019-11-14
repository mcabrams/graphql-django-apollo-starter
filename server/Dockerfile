FROM python:3.7.4
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
RUN apt-get -q update && apt-get -qy install netcat
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
