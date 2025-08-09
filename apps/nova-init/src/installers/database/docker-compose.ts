import * as fs from 'fs/promises';
import * as path from 'path';
import consola from 'consola';

// Import database Docker Compose generators
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
import getYugabytedbCompose from './docker/yugabytedb/yugabytedb.js';

const composeMap: Record<string, { getCompose: Function; description: string }> = {
  cassandra: {
    getCompose: getCassandraCompose,
    description: 'Cassandra - Distributed NoSQL database'
  },
  cockroachdb: {
    getCompose: getCockroachdbCompose,
    description: 'CockroachDB - Distributed SQL database'
  },
  couchdb: {
    getCompose: getCouchdbCompose,
    description: 'CouchDB - Document-oriented NoSQL database'
  },
  edgedb: {
    getCompose: getEdgedbCompose,
    description: 'EdgeDB - Next-generation relational database'
  },
  mariadb: {
    getCompose: getMariadbCompose,
    description: 'MariaDB - MySQL-compatible open source database'
  },
  mongodb: {
    getCompose: getMongoCompose,
    description: 'MongoDB - Document-oriented NoSQL database'
  },
  mysql: {
    getCompose: getMysqlCompose,
    description: 'MySQL - Relational database'
  },
  neo4j: {
    getCompose: getNeo4jCompose,
    description: 'Neo4j - Graph database'
  },
  postgres: {
    getCompose: getPostgresCompose,
    description: 'PostgreSQL - Object-relational database'
  },
  redis: {
    getCompose: getRedisCompose,
    description: 'Redis - In-memory data structure store'
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

export async function createDockerCompose(targetPath: string, database: string, options: any = {}) {
  try {
    const config = composeMap[database.toLowerCase()];
    if (!config) {
      throw new Error(`Unknown database: ${database}`);
    }

    const dockerComposePath = path.join(targetPath, 'docker-compose.yml');
    const composeContent = config.getCompose(options);

    await fs.writeFile(dockerComposePath, composeContent);

    consola.success(`✅ Docker Compose file created for ${database}`);
    consola.info(`📝 Database configuration: ${config.description}`);

  } catch (error) {
    consola.error(`❌ Error creating Docker Compose file for ${database}:`, error);
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

export async function generateDatabaseCompose(database: string, options: any = {}): Promise<string> {
  const config = composeMap[database.toLowerCase()];
  if (!config) {
    throw new Error(`Unknown database: ${database}`);
  }
  
  return config.getCompose(options);
}
