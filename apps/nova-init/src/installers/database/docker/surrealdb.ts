export default function getSurrealdbCompose({
    containerName = 'surrealdb',
    username = 'admin',
    password = 'password123',
    port = 8000,
    networkName = 'local_dbs_network',
    volumeName = 'surrealdb_data'
  } = {}) {
    return `
  version: '3.8'
  services:
    surrealdb:
      image: surrealdb/surrealdb:latest
      container_name: ${containerName}
      networks:
        - local
      ports:
        - "${port}:8000"
      volumes:
        - ${volumeName}:/data/db
      user: root
      command: [
        "start",
        "--log", "full",
        "--auth",
        "--user", "${username}",
        "--pass", "${password}",
        "file:/data/db"
      ]
  
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