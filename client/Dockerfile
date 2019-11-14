# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build-stage
RUN apk add --no-cache bash
WORKDIR /app
COPY ./client/package*.json /app/
RUN npm install
COPY ./client/ /app/
COPY ./server/schema/schema.json /app/schema/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./client/nginx.conf /etc/nginx/conf.d/default.conf
