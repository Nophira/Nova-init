// src/commands/database/docker/mongodb.js
export default function getMongoCompose({ username = 'admin', password = 'password123', port = 27017 } = {}) {
    return `
  version: '3.8'
  services:
    mongodb:
      image: mongo:latest
          restart: always
      container_name: mongodb
      ports:
        - "${port}:27017"
      environment:
        - MONGO_INITDB_ROOT_USERNAME=${username}
        - MONGO_INITDB_ROOT_PASSWORD=${password}
      volumes:
        - mongodb_data:/data/db
  volumes:
    mongodb_data:
  `;
  }