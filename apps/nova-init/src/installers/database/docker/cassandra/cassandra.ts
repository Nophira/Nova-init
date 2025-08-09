export default function getCassandraCompose({
  containerName = 'cassandra',
  port = 9042,
  networkName = 'local_dbs_network',
  volumeName = 'cassandra_data'
} = {}) {
  return `
version: '3.8'
services:
  cassandra:
    image: cassandra:latest
    container_name: ${containerName}
    environment:
      CASSANDRA_CLUSTER_NAME: "LocalCluster"
      CASSANDRA_DC: "datacenter1"
      CASSANDRA_RACK: "rack1"
    healthcheck:
      test: ["CMD", "cqlsh", "-u", "cassandra", "-p", "cassandra", "-e", "describe keyspaces"]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:9042"
    volumes:
      - ${volumeName}:/var/lib/cassandra

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
