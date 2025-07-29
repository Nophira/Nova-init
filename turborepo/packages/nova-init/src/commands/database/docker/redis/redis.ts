// src/commands/database/docker/redis/redis.js


export default function getRedisCompose({
  containerName = 'redis_db',
  port = 6379,
  networkName = 'local_dbs_network',
  volumeName = 'redis_db_data'
} = {}) {
  return `
version: '3.8'
services:
  redis:
    image: redis:alpine
    container_name: ${containerName}
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:6379"
    volumes:
      - ${volumeName}:/data

networks:
  local:
    driver: "bridge"
    name: ${networkName}

volumes:
  ${volumeName}:
    driver: "local"
    name: "${volumeName}"
`;
}