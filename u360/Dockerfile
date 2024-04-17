# syntax=docker/dockerfile:1

FROM nginx:latest
COPY nginx/nginx.conf /etc/nginx/conf.d/u360.conf
COPY dist/u360 /usr/share/nginx/html
