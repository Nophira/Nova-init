// src/commands/database/docker/postgresql/postgres.js


export default function getPostgresCompose({
  containerName = 'pgsql_db',
  database = 'local',
  username = 'admin',
  password = 'password123',
  port = 5432,
  networkName = 'local_dbs_network',
  volumeName = 'pgsql_db_data'
} = {}) {
  return `
version: '3.8'
services:
  pgsql:
    image: postgres:latest
    container_name: ${containerName}
    environment:
      POSTGRES_DB: "${database}"
      POSTGRES_USER: "${username}"
      POSTGRES_PASSWORD: "${password}"
    healthcheck:
      test: [
        "CMD", "pg_isready", "-q",
        "-d", "${database}",
        "-U", "${username}"
      ]
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:5432"
    volumes:
      - ${volumeName}:/var/lib/postgresql/data

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