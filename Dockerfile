# Step 1: Use official Node image
FROM node:22

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy both frontend and backend package.json files
COPY kitsup-front/package*.json ./kitsup-front/
COPY kitsup-backend/package*.json ./kitsup-backend/

# Step 4: Install frontend dependencies & build
WORKDIR /app/kitsup-front
RUN npm install
RUN npm run build

# Step 5: Install backend dependencies
WORKDIR /app/kitsup-backend
RUN npm install

# Step 6: Go back to root & copy full source
WORKDIR /app
COPY kitsup-front/ ./kitsup-front/
COPY kitsup-backend/ ./kitsup-backend/

# Step 7: Set environment port
ENV PORT=8080

# Step 8: Expose port
EXPOSE 8080

# Step 9: Start Express server
CMD ["node", "kitsup-backend/index.js"]
