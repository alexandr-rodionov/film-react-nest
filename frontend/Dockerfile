FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL="//localhost/api/afisha"
ARG VITE_CDN_URL="//localhost/content/afisha"
RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]