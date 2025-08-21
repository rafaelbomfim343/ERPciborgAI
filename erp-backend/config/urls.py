from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('relatorios_app.urls')),  # aqui incluímos as rotas do app
]
