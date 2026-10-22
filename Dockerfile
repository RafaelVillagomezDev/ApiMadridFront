# ==========================================
# 🏗️ ETAPA 1: Construcción (Build)
# ==========================================
FROM node:22-alpine AS build-stage

WORKDIR /app

# Instalamos la misma versión de pnpm que se usa en local
RUN npm install -g pnpm@12.4.1

# Copiamos el manifiesto, el lockfile y la config de pnpm (allowBuilds)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# El script "prepare" ejecuta "cypress install": evitamos descargar el binario en producción
ENV CYPRESS_INSTALL_BINARY=0

# Instalamos exactamente las versiones del lockfile (falla si no está sincronizado con package.json)
RUN pnpm install --frozen-lockfile

# Copiamos el resto del código fuente (el .dockerignore protegerá la carpeta node_modules)
COPY . .

# Recibimos la variable de entorno desde Dokploy
ARG VITE_API_URL=https://api.yandrydev.cloud
ENV VITE_API_URL=$VITE_API_URL

# Compilamos la aplicación para producción (genera la carpeta dist)
RUN pnpm build


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