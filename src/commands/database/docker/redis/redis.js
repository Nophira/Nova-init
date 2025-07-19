// src/commands/database/docker/redis.js


export default function getRedisCompose({ port = 6379 } = {}) {
    return `
  version: '3.8'
  services:
    redis:
      image: redis:latest
      restart: always
      container_name: redis
      ports:
        - "${port}:6379"
      volumes:
        - redis_data:/data
  volumes:
    redis_data:
  `;
  }