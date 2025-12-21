# Horoscope App (Nginx + Docker)

Статическое веб-приложение: пользователь выбирает дату рождения, интерфейс показывает знак зодиака и короткий гороскоп.  
Приложение упаковано в Docker-образ на базе Nginx и автоматически собирается/публикуется в Yandex Container Registry через GitHub Actions при каждом коммите в `main`.

## Состав репозитория

- `index.html` — UI и разметка
- `style.css` — стили
- `script.js` — логика определения знака и текста гороскопа
- `nginx.conf` — конфиг Nginx для раздачи статики
- `Dockerfile` — сборка образа
- `.github/workflows/deploy.yml` — CI/CD: build & push в YCR
- `.gitignore`, `.dockerignore`

## Локальный запуск

```
docker build -t horoscope-app:local .
docker run --rm -p 8080:80 horoscope-app:local
```

Откройте в браузере: `http://localhost:8080`

## CI/CD (GitHub Actions → YCR)

Workflow запускается на `push` в ветку `main` и:
1) логинится в `cr.yandex`  
2) собирает Docker image  
3) пушит image в Yandex Container Registry с тегами `latest` и `${GITHUB_SHA}`

### Обязательные GitHub Secrets

Добавьте в репозитории: **Settings → Secrets and variables → Actions → New repository secret**

- `YC_ACCESS_KEY_ID` — Access Key ID сервисного аккаунта (например, `YCAJE...`)
- `YC_ACCESS_KEY_SECRET` — Secret Key сервисного аккаунта (например, `YCP...`)
- `YC_FOLDER_ID` — ID каталога (folder) в Yandex Cloud

## Имя образа

Образ публикуется как:

- `cr.yandex/<YC_FOLDER_ID>/horoscope-app:latest`
- `cr.yandex/<YC_FOLDER_ID>/horoscope-app:<commit_sha>`
```

Формат имени образа для push в Yandex Container Registry должен быть вида `cr.yandex/<registry_ID>/<image_name>:<tag>`, иначе push не пройдет.[1]
Для Docker CLI endpoint реестра при аутентификации используется `cr.yandex` (например, `docker login ... cr.yandex`).
