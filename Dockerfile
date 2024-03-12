# Etapa de construcción
FROM node:18-alpine3.18 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:18-alpine3.18 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.23.1 AS prod
EXPOSE 80
COPY --from=builder /app/dist/angular-login-jwt /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
