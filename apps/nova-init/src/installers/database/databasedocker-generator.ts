import * as fs from 'fs/promises';
import path from 'path';
import consola from 'consola';
import type { DatabaseSetup } from '../../types/index.js';

// Database function imports
import getPostgresCompose from './docker/postgresql.js';
import getMongoCompose from './docker/mongodb.js';
import getMysqlCompose from './docker/mysql.js';
import getRedisCompose from './docker/redis.js';
import getNeo4jCompose from './docker/neo4j.js';
import getCassandraCompose from './docker/cassandra.js';
import getCouchdbCompose from './docker/couchdb.js';
import getMariadbCompose from './docker/mariadb.js';
import getCockroachdbCompose from './docker/cockroachdb.js';
import getEdgedbCompose from './docker/edgedb.js';
import getSurrealdbCompose from './docker/surrealdb.js';
import getYugabytedbCompose from './docker/yugabytedb.js';

const databaseFunctions = {
  postgres: getPostgresCompose,
  postgresql: getPostgresCompose,
  mongodb: getMongoCompose,
  mysql: getMysqlCompose,
  redis: getRedisCompose,
  neo4j: getNeo4jCompose,
  cassandra: getCassandraCompose,
  couchdb: getCouchdbCompose,
  mariadb: getMariadbCompose,
  cockroachdb: getCockroachdbCompose,
  edgedb: getEdgedbCompose,
  surrealdb: getSurrealdbCompose,
  yugabytedb: getYugabytedbCompose
};

export async function getAvailableDatabases(): Promise<string[]> {
  return Object.keys(databaseFunctions);
}

export async function getDatabaseParameters(database: string): Promise<Record<string, any>> {
  // Return empty object since the new functions handle parameters directly
  return {};
}

export async function generateDockerCompose(
  databaseConfigs: DatabaseSetup[],
  outputPath: string
): Promise<void> {
  try {
    let allServices: string[] = [];
    
    // Generate each database service
    for (const config of databaseConfigs) {
      const dbType = config.type.toLowerCase();
      const dbFunction = databaseFunctions[dbType as keyof typeof databaseFunctions];
      
      if (!dbFunction) {
        consola.warn(`⚠️ No function found for database type: ${dbType}`);
        continue;
      }
      
      // Create options object for the database function
      const options = {
        containerName: config.containerName || `${dbType}_db`,
        port: config.port || 5432,
        networkName: config.networkName || 'local_dbs_network',
        volumeName: config.volumeName || `${dbType}_data`,
        database: config.database || 'local',
        username: config.username || 'admin',
        password: config.password || 'password123'
      };
      
      // Generate the docker-compose YAML for this database
      const yaml = dbFunction(options);
      allServices.push(yaml);
    }
    
    // Combine all services into one docker-compose file
    const combinedYaml = allServices.join('\n---\n');
    
    await fs.writeFile(outputPath, combinedYaml, 'utf-8');
    
    consola.success(`✅ Docker Compose file generated at ${outputPath}`);
  } catch (error) {
    consola.error('❌ Failed to generate Docker Compose file:', error);
    throw error;
  }
}


