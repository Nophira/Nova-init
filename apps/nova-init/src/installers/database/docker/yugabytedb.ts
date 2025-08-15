export default function getYugabytedbCompose({
  containerName = 'yugabytedb',
  port = 5433,
  httpPort = 7000,
  networkName = 'local_dbs_network',
  volumeName = 'yugabytedb_data'
} = {}) {
  return `
version: '3.8'
services:
  yugabytedb:
    image: yugabytedb/yugabyte:latest
    container_name: ${containerName}
    command: ["bin/yugabyted", "start", "--daemon=false"]
    healthcheck:
      test: ["CMD", "ysqlsh", "-h", "localhost", "-p", "5433", "-U", "yugabyte", "-c", "SELECT 1"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:5433"
      - "${httpPort}:7000"
    volumes:
      - ${volumeName}:/var/lib/yugabyte

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
