# 🌟 Dio-App - Персональный гороскоп

Статическое веб-приложение для генерации персонального гороскопа по дате рождения. Автоматический CI/CD деплой в Yandex Managed Kubernetes с использованием Container Registry.[1][2]

## 🚀 Быстрый старт

### Локальный запуск
```bash
# Сборка Docker образа
docker build -t dio-app .

# Запуск контейнера
docker run -p 8080:80 dio-app
```
Откройте http://localhost:8080[3]

### Kubernetes (Yandex Cloud)
Приложение доступно на порту **30080** всех нод кластера:
```
http://<ANY_NODE_IP>:30080
```

## 🏗️ Архитектура

```
GitHub → Yandex Container Registry → Managed Kubernetes (2 реплики)
          ↓
      NodePort:30080 → Nginx → Статический SPA
```

**Компоненты:**
- **Nginx**: Оптимизированный сервер с gzip, долгоживущим кэшем (1 год) для статики[3]
- **SPA**: HTML/JS/CSS - определение знака зодиака + готовые гороскопы
- **Kubernetes**: Deployment (2 поды) + NodePort Service[2]
- **CI/CD**: GitHub Actions → YCR → `kubectl rollout`[4]

## 📁 Структура проекта

```
.
├── Dockerfile          # Nginx:alpine + оптимизация
├── nginx.conf          # SPA routing + caching + gzip
├── static/             # Frontend файлы
│   ├── index.html
│   ├── script.js       # Логика гороскопов
│   └── style.css
└── k8s/
    ├── deployment.yaml # 2 реплики, 128Mi/100m лимиты
    └── service.yaml    # NodePort 30080
└── .github/workflows/ # Авто деплой на main
```

## 🔧 Настройка production

### 1. Yandex Cloud секреты (GitHub)
```
YC_CLOUD_ID        # ID облака
YC_FOLDER_ID       # ID папки
YC_REGISTRY_ID     # crpXXXXXXXXX
YC_SA_KEY          # JSON ключ сервисного аккаунта
KUBE_CONFIG_DATA   # base64(kubeconfig)
```

### 2. Развертывание в кластер
```bash
# Генерация kubeconfig
yc managed-kubernetes cluster get-kubeconfig --id <CLUSTER_ID>

# Apply манифесты
kubectl apply -f k8s/
```

**Роли для SA:**
- `container-registry.images.pusher` (YCR)
- `editor` (Kubernetes)[5]

## 🎯 Особенности

### Nginx оптимизации
- `try_files` для SPA роутинга
- `Cache-Control: immutable` (1y) для assets
- Gzip для текста/JS/CSS
- `tini` для правильного PID 1[3]

### Kubernetes
| Ресурс | Описание | Значение |
|--------|----------|----------|
| Replicas | Доступность | 2 |
| Limits | CPU/Mem | 100m/128Mi |
| Service | Доступ | NodePort 30080 |
| Registry | Приватный | `cr.yandex/...` [1]

### CI/CD пайплайн
1. ✅ Build & Push (latest + sha)
2. ✅ `kubectl set image` + `rollout status`
3. ✅ Только на `main` branch[4]

## 🔍 Доступ к подам

```bash
# Статус
kubectl get pods -l app=dio-app

# Логи
kubectl logs -l app=dio-app -f

# Прокси
kubectl port-forward svc/dio-app-service 8080:80
```

## 📈 Масштабирование

```yaml
# Увеличить реплики
kubectl scale deployment/dio-app --replicas=4

# HPA (горизонтальное масштабирование)
kubectl autoscale deployment dio-app --min=2 --max=10 --cpu-percent=70
```

## 🐛 Troubleshooting

| Проблема | Решение |
|----------|---------|
| ImagePullBackOff | Проверить `yc container registry configure-docker` [6] |
| CrashLoopBackOff | `kubectl logs` + ресурсы |
| 502/504 | `kubectl rollout status` |
| Нет доступа | NodePort `30080` на всех нодах [2] |

## 📄 Лицензия
MIT - используйте свободно!