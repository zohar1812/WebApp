FROM node:7
WORKDIR /app
COPY . /app
CMD node server.js
EXPOSE 8000