FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY public/content/afisha ./public/content/afisha
ENV NODE_ENV="production"
EXPOSE 3000
CMD ["node", "./dist/main.js"]
