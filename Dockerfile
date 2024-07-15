# Stage 1: Build Stage for Windows and macOS
FROM node:18-alpine AS build-windows

WORKDIR /app
COPY package*.json ./

RUN apk update \
    && apk add --no-cache python3 make g++ \
    && ln -sf python3 /usr/bin/python
# Install pdf-poppler and other Windows-specific dependencies
RUN npm install pdf-poppler 
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production Stage for Linux
FROM node:18-bullseye-slim AS production-linux
WORKDIR /app
COPY package*.json ./
# Install poppler-utils and other Linux-specific dependencies
RUN apt-get update \
    && apt-get install -y poppler-utils python3 make g++\
    && rm -rf /var/lib/apt/lists/*
# Copy package.json and package-lock.json


# Install dependencies
RUN npm install --only=production

# Copy the built application from build-windows stage
COPY --from=build-windows /app/.next ./.next
COPY --from=build-windows /app/public ./public
# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
