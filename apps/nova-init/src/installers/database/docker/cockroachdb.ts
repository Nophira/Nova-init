export default function getCockroachdbCompose({
    dbPort = 26257,
    uiPort = 8080,
    containerName = 'cockroachdb',
    networkName = 'local_dbs_network',
    volumeName = 'cockroachdb_data'
  } = {}) {
    return `
  version: '3.8'
  services:
    cockroachdb:
      image: cockroachdb/cockroach:latest
      container_name: ${containerName}
      networks:
        - local
      ports:
        - "${dbPort}:26257"
        - "${uiPort}:8080"
      volumes:
        - ${volumeName}:/cockroach/cockroach-data
      command: ["start-single-node", "--insecure"]
  
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