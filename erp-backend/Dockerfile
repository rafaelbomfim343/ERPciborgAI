# Usa a imagem oficial do Python
FROM python:3.12-slim

# Usa uma imagem leve do Python
FROM python:3.12-slim

# Define o diretório de trabalho
WORKDIR /erp-backend

# Copia os arquivos de dependências
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o projeto para o container
COPY . .

# Comando padrão (executa o servidor Django)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]