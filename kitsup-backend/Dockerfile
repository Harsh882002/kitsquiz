# kitsup-backend/Dockerfile
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=8080
EXPOSE 8080
CMD ["node", "index.js"]
