// src/commands/database/docker/mariadb/mariadb.js

export default function getMariadbCompose({
    containerName = 'mariadb',
    rootPassword = 'password123',
    database = 'mydatabase',
    username = 'admin',
    password = 'password123',
    port = 3306,
    networkName = 'local_dbs_network',
    volumeName = 'mariadb_data'
  } = {}) {
    return `
  version: '3.8'
  services:
    mariadb:
      image: mariadb:latest
      container_name: ${containerName}
      environment:
        MARIADB_ROOT_HOST: "%"
        MARIADB_ROOT_PASSWORD: "${rootPassword}"
        MARIADB_DATABASE: "${database}"
        MARIADB_USER: "${username}"
        MARIADB_PASSWORD: "${password}"
        MARIADB_ALLOW_EMPTY_ROOT_PASSWORD: 'yes'
      healthcheck:
        test: ["CMD", "mysqladmin", "ping", "-p${rootPassword}"]
        retries: 3
        timeout: 5s
      networks:
        - local
      ports:
        - "${port}:3306"
      volumes:
        - ${volumeName}:/var/lib/mysql
  
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