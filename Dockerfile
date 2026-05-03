# Build on top of Nginx
FROM nginx:alpine

# Copy the static files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
