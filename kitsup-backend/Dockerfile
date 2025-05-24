# Stage 1: Build frontend
FROM node:22 as frontend-builder

WORKDIR /app/kitsup-front
COPY kitsup-front/package*.json ./
RUN npm install
COPY kitsup-front/ .
RUN npm run build

# Stage 2: Build backend and combine
FROM node:22

WORKDIR /app

# 1. Copy backend package files and install dependencies
COPY kitsup-backend/package*.json ./kitsup-backend/
WORKDIR /app/kitsup-backend
RUN npm install --production

# 2. Copy built frontend dist into backend public folder
WORKDIR /app
COPY --from=frontend-builder /app/kitsup-front/dist ./kitsup-backend/public

# 3. Copy backend source code after dependencies for better caching
COPY kitsup-backend/ ./kitsup-backend/

# Environment setup
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

# Start backend server
WORKDIR /app/kitsup-backend
CMD ["node", "index.js"]
