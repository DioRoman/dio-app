FROM nginx:alpine

# Удаляем дефолтный контент nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем файлы приложения
COPY . /usr/share/nginx/html/

# Копируем nginx конфигурацию
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Оптимизация размера образа
RUN apk add --no-cache tini && \
    rm -rf /var/cache/apk/*

# Используем tini как PID 1
ENTRYPOINT ["/sbin/tini", "--"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
