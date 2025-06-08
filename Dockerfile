# Stage 1: Build the React application
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the app and build
COPY . .
RUN npm run build

# Stage 2: Serve the built application
FROM node:18-alpine

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the built app from builder
COPY --from=builder /app/build ./build

# Expose the port
EXPOSE 80

# Run the app
CMD ["serve", "-s", "build", "-l", "80"]
