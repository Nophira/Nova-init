// src/commands/database/docker/mysql.js

export default function getMysqlCompose({password = 'password123', port = 3306 } = {}) {
    return `
  version: '3.8'
  services:
    mysql:
      image: mysql:latest
      restart: always
      container_name: mysql
      ports:
        - "${port}:3306"
      environment:
        - MYSQL_ROOT_PASSWORD=${password}
      volumes:
        - mysql_data:/var/lib/mysql
  volumes:
    mysql_data:
  `;
  }