export default function getYugabytedbCompose({
    containerName = 'yugabytedb',
    ysqlPort = 5433,
    ycqlPort = 9042,
    masterPort = 7001,
    tserverPort = 9000,
    networkName = 'local_dbs_network',
    volumeName = 'yugabytedb_data'
  } = {}) {
    return `
  version: '3.8'
  services:
    yugabytedb:
      image: yugabytedb/yugabyte:latest
      container_name: ${containerName}
      networks:
        - local
      ports:
        - "${ysqlPort}:5433"
        - "${ycqlPort}:9042"
        - "${masterPort}:7000"
        - "${tserverPort}:9000"
      volumes:
        - ${volumeName}:/home/yugabyte/yb_data
      command: [
        "bin/yugabyted", "start",
        "--base_dir=/home/yugabyte/yb_data",
        "--daemon=false"
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