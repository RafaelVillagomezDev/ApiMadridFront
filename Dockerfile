# ==========================================
# 🏗️ ETAPA 1: Construcción (Build)
# ==========================================
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copiamos únicamente el package.json (evita errores si el lockfile no subió)
COPY package.json ./

# Instalamos las dependencias con npm (genera el lockfile automáticamente si falta)
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Recibimos la variable de entorno desde Dokploy
ARG VITE_API_URL=https://api.yandrydev.cloud
ENV VITE_API_URL=$VITE_API_URL

# Compilamos la aplicación para producción (genera la carpeta dist)
RUN npm run build


# ==========================================
# 🚀 ETAPA 2: Servidor Web de Producción (Nginx)
# ==========================================
FROM nginx:alpine-slim

# Copiamos los archivos compilados de Vue desde la etapa anterior a la ruta pública de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiamos nuestro archivo nginx.conf seguro personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]