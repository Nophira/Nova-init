export default function getCockroachdbCompose({
  containerName = 'cockroachdb',
  port = 26257,
  httpPort = 8080,
  networkName = 'local_dbs_network',
  volumeName = 'cockroachdb_data'
} = {}) {
  return `
version: '3.8'
services:
  cockroachdb:
    image: cockroachdb/cockroach:latest
    container_name: ${containerName}
    command: start-single-node --insecure
    healthcheck:
      test: ["CMD", "cockroach", "node", "status", "--insecure"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:26257"
      - "${httpPort}:8080"
    volumes:
      - ${volumeName}:/cockroach/cockroach-data

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
