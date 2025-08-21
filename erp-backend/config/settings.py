import os
import json
from pathlib import Path
import dj_database_url
from django.core.management.utils import get_random_secret_key

BASE_DIR = Path(__file__).resolve().parent.parent

# =======================
# Configurações principais
# =======================
SECRET_KEY = os.environ.get("SECRET_KEY", get_random_secret_key())
DEBUG = os.environ.get("DEBUG", "False") == "True"
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "*").split(",")

# =======================
# Aplicativos instalados
# =======================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "relatorios_app",
]

# =======================
# Middleware
# =======================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# =======================
# Banco de dados
# =======================
DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get(
            "DATABASE_URL",
            "postgresql://usuario:senha@localhost:5432/dbname?sslmode=require",
        ),
        conn_max_age=600,
        ssl_require=True,
    )
}

# =======================
# Redis (exemplo de cache)
# =======================
REDIS_URL = os.environ.get("REDIS_URL")
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}

# =======================
# REST Framework
# =======================
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PARSER_CLASSES": ["rest_framework.parsers.JSONParser"],
}

# =======================
# CORS
# =======================
CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [url.strip() for url in os.environ.get("FRONTEND_URLS").split(",")]

# Obter domínios permitidos do .env, separados por vírgula
FRONTEND_URLS = os.environ.get(
    "FRONTEND_URLS", "http://localhost:3000,https://seu-frontend.vercel.app"
)

# Transformar a string em lista
CORS_ALLOWED_ORIGINS = [url.strip() for url in FRONTEND_URLS.split(",")]


# =======================
# Estáticos e mídia
# =======================
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# =======================
# Internacionalização
# =======================
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# =======================
# Firebase
# =======================
FIREBASE_CONFIG = json.loads(os.environ.get("FIREBASE_CONFIG", "{}"))

# =======================
# E-mail
# =======================
EMAIL_HOST = os.environ.get("EMAIL_HOST", "")
EMAIL_PORT = int(os.environ.get("EMAIL_PORT", 587))
EMAIL_HOST_USER = os.environ.get("EMAIL_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")
EMAIL_USE_TLS = True

# =======================
# Configurações de segurança para produção
# =======================
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "DENY"

# =======================
# Auto field
# =======================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
