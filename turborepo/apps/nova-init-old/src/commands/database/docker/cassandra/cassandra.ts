// src/commands/database/docker/cassandra/cassandra.js

export default function getCassandraCompose({
    port = 9042,
    containerName = 'cassandra',
    networkName = 'local_dbs_network',
    volumeName = 'cassandra_db_data'
  } = {}) {
    return `
  version: '3.8'
  services:
    cassandra:
      image: cassandra:latest
      restart: always
      container_name: ${containerName}
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