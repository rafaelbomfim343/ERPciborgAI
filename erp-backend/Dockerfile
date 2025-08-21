# Base
FROM python:3.11-slim

WORKDIR /app

# Dependências de sistema
RUN apt-get update && apt-get install -y \
    libpq-dev gcc g++ \
    && rm -rf /var/lib/apt/lists/*

# Copia e instala dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia aplicação
COPY . .

# Expõe porta do Django
EXPOSE 8000

# Comando de produção com Gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
