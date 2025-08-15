export default function getCouchdbCompose({
  containerName = 'couchdb',
  port = 5984,
  adminUser = 'admin',
  adminPassword = 'password123',
  networkName = 'local_dbs_network',
  volumeName = 'couchdb_data'
} = {}) {
  return `
version: '3.8'
services:
  couchdb:
    image: couchdb:latest
    container_name: ${containerName}
    environment:
      COUCHDB_USER: "${adminUser}"
      COUCHDB_PASSWORD: "${adminPassword}"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5984/_up"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:5984"
    volumes:
      - ${volumeName}:/opt/couchdb/data

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
