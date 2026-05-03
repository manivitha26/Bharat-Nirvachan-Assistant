# Build on top of Nginx
FROM nginx:alpine

# Copy the static files to the nginx html directory
COPY . /usr/share/nginx/html

# Configure Nginx to listen on the port specified by Cloud Run's PORT environment variable
CMD sh -c "echo \"server { listen \${PORT}; location / { root /usr/share/nginx/html; index index.html index.htm; } }\" > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
