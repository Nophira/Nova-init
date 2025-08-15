export default function getSurrealdbCompose({
  containerName = 'surrealdb',
  port = 8000,
  networkName = 'local_dbs_network',
  volumeName = 'surrealdb_data'
} = {}) {
  return `
version: '3.8'
services:
  surrealdb:
    image: surrealdb/surrealdb:latest
    container_name: ${containerName}
    command: start --user root --pass root memory
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:8000"
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
