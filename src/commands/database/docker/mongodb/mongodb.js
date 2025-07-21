// src/commands/database/docker/mongodb/mongodb.js

export default function getMongoCompose({
  containerName = 'mongodb',
  database = 'local',
  username = 'admin',
  password = 'password123',
  port = 27017,
  networkName = 'local_dbs_network',
  configVolume = 'mongodb_config',
  dataVolume = 'mongodb_data'
} = {}) {
  return `
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: ${containerName}
    environment:
      MONGO_INITDB_DATABASE: "${database}"
      MONGO_INITDB_ROOT_USERNAME: "${username}"
      MONGO_INITDB_ROOT_PASSWORD: "${password}"
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo mongodb:27017/test --quiet
      retries: 3
      timeout: 5s
    networks:
      - local
    ports:
      - "${port}:27017"
    volumes:
      - ${configVolume}:/data/configdb
      - ${dataVolume}:/data/db

networks:
  local:
    driver: "bridge"
    name: ${networkName}

volumes:
  ${configVolume}:
    driver: "local"
    name: "${configVolume}"
  ${dataVolume}:
    driver: "local"
    name: "${dataVolume}"
`;
}