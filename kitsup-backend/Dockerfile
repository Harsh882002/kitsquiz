FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV NODE_ENV=production PORT=8080
USER node
EXPOSE 8080
CMD ["node", "index.js"]
