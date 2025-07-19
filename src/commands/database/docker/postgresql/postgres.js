// src/commands/database/docker/postgres.js


export default function getPostgresCompose({port = 5432 } = {}) {
    return `
  version: '3.8'
  services:
    postgres:
      image: postgres:latest
      restart: always
      container_name: postgres
      ports:
        - "${port}:5432"
      volumes:
        - postgres_data:/var/lib/postgresql/data
  volumes:
    postgres_data:
  `;
  }