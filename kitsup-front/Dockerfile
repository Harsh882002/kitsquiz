# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config to replace default config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 since nginx will listen on it
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
