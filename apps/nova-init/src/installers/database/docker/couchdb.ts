export default function getCouchdbCompose({
    username = 'admin',
    password = 'password123',
    port = 5984,
    containerName = 'couchdb',
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
        COUCHDB_USER: "${username}"
        COUCHDB_PASSWORD: "${password}"
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