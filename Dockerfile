FROM nginx:alpine

# Удаляем дефолтный контент nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем статические файлы
COPY static/ /usr/share/nginx/html/

# Копируем nginx конфигурацию
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Оптимизация
RUN apk add --no-cache tini && rm -rf /var/cache/apk/*

ENTRYPOINT ["/sbin/tini", "--"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
