export default function getRedisCompose({
  containerName = 'redis',
  port = 6379,
  networkName = 'local_dbs_network',
  volumeName = 'redis_data'
} = {}) {
  return `
version: '3.8'
services:
  redis:
    image: redis:latest
    container_name: ${containerName}
    command: redis-server --appendonly yes
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
