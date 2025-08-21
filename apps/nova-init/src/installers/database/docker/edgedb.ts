export default function getEdgedbCompose({
    containerName = 'edgedb',
    rootPassword = 'password123',
    port = 5656,
    networkName = 'local_dbs_network',
    dataVolume = 'edgedb_data',
    schemaVolume = 'edgedb_schema'
  } = {}) {
    return `
  version: '3.8'
  services:
    edgedb:
      image: edgedb/edgedb:latest
      container_name: ${containerName}
      environment:
        EDGEDB_SERVER_ADMIN_UI: "enabled"
        EDGEDB_SERVER_PASSWORD: "${rootPassword}"
        EDGEDB_SERVER_PORT: ${port}
        EDGEDB_SERVER_SECURITY: insecure_dev_mode
      networks:
        - local
      ports:
        - "${port}:${port}"
      volumes:
        - ${schemaVolume}:/dbschema
        - ${dataVolume}:/var/lib/edgedb/data
  
  networks:
    local:
      driver: "bridge"
      name: ${networkName}
  
  volumes:
    ${dataVolume}:
      driver: "local"
      name: "${dataVolume}"
    ${schemaVolume}:
      driver: "local"
      name: "${schemaVolume}"
  `;
  }