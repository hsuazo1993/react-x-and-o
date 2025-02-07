# Use a Node.js base image for building the app
FROM node:22.13.1-alpine as build
# FROM node:20.10.0 as build

# Set the working directory in the container
WORKDIR /react-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app to Nginx's web server directory
COPY --from=build /react-app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]