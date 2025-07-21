import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import getCassandraCompose from './docker/cassandra/cassandra.js';
import getCockroachdbCompose from './docker/cockroachdb/cockroachdb.js';
import getCouchdbCompose from './docker/couchdb/couchdb.js';
import getEdgedbCompose from './docker/edgedb/edgedb.js';
import getMariadbCompose from './docker/mariadb/mariadb.js';
import getMongoCompose from './docker/mongodb/mongodb.js';
import getMysqlCompose from './docker/mysql/mysql.js';
import getNeo4jCompose from './docker/neo4j/neo4j.js';
import getPostgresCompose from './docker/postgresql/postgres.js';
import getRedisCompose from './docker/redis/redis.js';
import getSurrealdbCompose from './docker/surrealdb/surrealdb.js';
import getYugabytedbCompose from './docker/yufabytedb/yufabytedb.js';

const composeMap = {
  cassandra: {
    getCompose: getCassandraCompose,
    description: 'Cassandra - Verteilte NoSQL-Datenbank'
  },
  cockroachdb: {
    getCompose: getCockroachdbCompose,
    description: 'CockroachDB - Distributed SQL database'
  },
  couchdb: {
    getCompose: getCouchdbCompose,
    description: 'CouchDB - Dokumentenorientierte NoSQL-Datenbank'
  },
  edgedb: {
    getCompose: getEdgedbCompose,
    description: 'EdgeDB - Next-generation relational database'
  },
  mariadb: {
    getCompose: getMariadbCompose,
    description: 'MariaDB - MySQL-kompatible Open-Source-Datenbank'
  },
  mongodb: {
    getCompose: getMongoCompose,
    description: 'MongoDB - Dokumentenorientierte NoSQL-Datenbank'
  },
  mysql: {
    getCompose: getMysqlCompose,
    description: 'MySQL - Relationale Datenbank'
  },
  neo4j: {
    getCompose: getNeo4jCompose,
    description: 'Neo4j - Graphdatenbank'
  },
  postgres: {
    getCompose: getPostgresCompose,
    description: 'PostgreSQL - Objektrelationale Datenbank'
  },
  redis: {
    getCompose: getRedisCompose,
    description: 'Redis - In-Memory Datenbank'
  },
  surrealdb: {
    getCompose: getSurrealdbCompose,
    description: 'SurrealDB - Multi-model database'
  },
  yugabytedb: {
    getCompose: getYugabytedbCompose,
    description: 'YugabyteDB - Distributed SQL database'
  }
};

export function createDockerCompose(targetPath, database, options = {}) {
  try {
    const config = composeMap[database.toLowerCase()];
    if (!config) {
      throw new Error(`Unbekannte Datenbank: ${database}`);
    }

    const dockerComposePath = path.join(targetPath, 'docker-compose.yml');
    const composeContent = config.getCompose(options);

    fs.writeFileSync(dockerComposePath, composeContent);

    console.log(chalk.bold.green('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.green('║') + chalk.bold.white(' ✅ Docker Compose Datei erstellt!') + chalk.bold.green('                          ║'));
    console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════╝'));

    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 📝 Datenbank-Konfiguration:') + chalk.bold.cyan('                                ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray(`   • ${config.description}`) + chalk.bold.cyan('               ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   • Ports und Zugangsdaten in docker-compose.yml') + chalk.bold.cyan('           ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

    console.log(chalk.bold.yellow('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.yellow('║') + chalk.bold.white(' 🚀 Starten der Datenbank:') + chalk.bold.yellow('                                  ║'));
    console.log(chalk.bold.yellow('║') + chalk.gray('   docker-compose up -d') + chalk.bold.yellow('                                     ║'));
    console.log(chalk.bold.yellow('╚════════════════════════════════════════════════════════════╝'));

  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Fehler beim Erstellen der Docker Compose Datei:') + chalk.bold.red('        ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    throw error;
  }
}

export function getAvailableDatabases() {
  return Object.keys(composeMap).map(db => ({
    name: db.charAt(0).toUpperCase() + db.slice(1),
    value: db,
    description: composeMap[db].description
  }));
}