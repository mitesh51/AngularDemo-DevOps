FROM nginx:1-alpine
COPY dist/browser/ /usr/share/nginx/html
