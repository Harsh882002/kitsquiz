FROM node:22

WORKDIR /app

# 1. Copy backend package files and install dependencies
COPY package*.json ./
RUN npm install --production

# 2. Copy backend source code
COPY . .

# Environment setup
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

# Start backend server
CMD ["node", "index.js"]
