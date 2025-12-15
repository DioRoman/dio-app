# Базовый образ nginx на Alpine для компактности
FROM nginx:alpine

# Удаляем стандартные html файлы nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем статику в стандартную папку nginx
COPY ./static /usr/share/nginx/html

# Копируем кастомный конфиг nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]
