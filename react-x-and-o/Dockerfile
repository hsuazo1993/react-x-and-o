# Use a Node.js base image for building the app
FROM node:22.13.1-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Use a smaller Nginx image for serving the static files
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]