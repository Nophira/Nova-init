export default function getNeo4jCompose({
  containerName = 'neo4j',
  password = 'password123',
  port = 7474,
  boltPort = 7687,
  networkName = 'local_dbs_network',
  volumeName = 'neo4j_data'
} = {}) {
  return `
version: '3.8'
services:
  neo4j:
    image: neo4j:latest
    container_name: ${containerName}
    environment:
      NEO4J_AUTH: "neo4j/${password}"
      NEO4J_PLUGINS: '["apoc"]'
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:7474"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:7474"
      - "${boltPort}:7687"
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
