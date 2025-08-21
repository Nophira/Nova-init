export default function getNeo4jCompose({
    containerName = 'neo4j_db',
    httpPort = 7474,
    boltPort = 7687,
    networkName = 'local_dbs_network',
    dataVolume = 'neo4j_db_data',
    logsVolume = 'neo4j_db_logs'
  } = {}) {
    return `
  version: '3.8'
  services:
    neo4j:
      image: neo4j:latest
      container_name: ${containerName}
      networks:
        - local
      ports:
        - "${httpPort}:7474"
        - "${boltPort}:7687"
      volumes:
        - ${dataVolume}:/data
        - ${logsVolume}:/logs
  
  networks:
    local:
      driver: "bridge"
      name: ${networkName}
  
  volumes:
    ${dataVolume}:
      driver: "local"
      name: "${dataVolume}"
    ${logsVolume}:
      driver: "local"
      name: "${logsVolume}"
  `;
  }