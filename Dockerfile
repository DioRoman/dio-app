FROM nginx:1.29-alpine

RUN apk add --no-cache tini \
    && rm -rf /usr/share/nginx/html/* /var/cache/apk/* \
    && rm -rf /etc/nginx/conf.d/default.conf

COPY static/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/sbin/tini", "--"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]