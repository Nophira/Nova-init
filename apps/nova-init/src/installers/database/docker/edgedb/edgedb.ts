export default function getEdgedbCompose({
  containerName = 'edgedb',
  port = 5656,
  networkName = 'local_dbs_network',
  volumeName = 'edgedb_data'
} = {}) {
  return `
version: '3.8'
services:
  edgedb:
    image: edgedb/edgedb:latest
    container_name: ${containerName}
    environment:
      EDGEDB_SERVER_SECURITY: "insecure_dev_mode"
    healthcheck:
      test: ["CMD", "edgedb", "--host", "localhost", "--port", "5656", "query", "SELECT 1"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:5656"
    volumes:
      - ${volumeName}:/var/lib/edgedb/data

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
