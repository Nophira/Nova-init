export default function getMysqlCompose({
    containerName = 'mysql_db',
    rootPassword = 'password123',
    database = 'local',
    username = 'admin',
    password = 'password123',
    port = 3306,
    networkName = 'local_dbs_network',
    volumeName = 'mysql_db_data'
  } = {}) {
    return `
  version: '3.8'
  services:
    mysql:
      image: mysql:latest
      container_name: ${containerName}
      environment:
        MYSQL_ROOT_HOST: "%"
        MYSQL_ROOT_PASSWORD: "${rootPassword}"
        MYSQL_DATABASE: "${database}"
        MYSQL_USER: "${username}"
        MYSQL_PASSWORD: "${password}"
        MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
      healthcheck:
        test: ["CMD", "mysqladmin", "ping", "-p${rootPassword}"]
        retries: 3
        timeout: 5s
      networks:
        - local
      platform: linux/x86_64
      ports:
        - "${port}:3306"
      volumes:
        - ${volumeName}:/var/lib/mysql
      # command: "--default-authentication-plugin=mysql_native_password"
  
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