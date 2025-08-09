export default function getMysqlCompose({
  containerName = 'mysql_db',
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
      MYSQL_DATABASE: "${database}"
      MYSQL_USER: "${username}"
      MYSQL_PASSWORD: "${password}"
      MYSQL_ROOT_PASSWORD: "${password}"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
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
