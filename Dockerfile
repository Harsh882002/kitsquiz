# Stage 1: Build frontend
FROM node:22 as frontend-builder

WORKDIR /app/kitsup-front
COPY kitsup-front/package*.json ./
RUN npm install
COPY kitsup-front/ .
RUN npm run build

# Stage 2: Build backend
FROM node:22

WORKDIR /app

# 1. Copy backend dependencies first (for layer caching)
COPY kitsup-backend/package*.json ./kitsup-backend/
WORKDIR /app/kitsup-backend
RUN npm install --production

# 2. Copy built frontend to backend's public folder
WORKDIR /app
COPY --from=frontend-builder /app/kitsup-front/dist ./kitsup-backend/public

# 3. Copy backend source code
COPY kitsup-backend/ ./kitsup-backend/

# 4. Environment variables (for GCP MySQL)
ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ENV DB_HOST=$DB_HOST \
    DB_USER=$DB_USER \
    DB_PASS=$DB_PASSWORD \
    DB_NAME=$DB_NAME \
    NODE_ENV=production \
    PORT=8080

# 5. Security hardening
RUN chown -R node:node /app && \
    apt-get update && \
    apt-get install -y --no-install-recommends dumb-init

# 6. Run as non-root user
USER node

# 7. Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/api/health || exit 1

# 8. Entry point
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "kitsup-backend/index.js"]

EXPOSE 8080
