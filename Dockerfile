FROM node:18

# Install bash (if needed)
# RUN apk add --no-cache bash

# Set npm config timeout
# RUN npm config set timeout 1000000

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]