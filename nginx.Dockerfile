FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY docker/nginx/nginx.conf /etc/nginx/conf.d