import { multiselect, isCancel, cancel } from '@clack/prompts';
import type { DatabaseSetup, DatabaseType } from '../../types/index.js';

const databaseOptions = [
  { value: 'mongodb', label: 'MongoDB – NoSQL database' },
  { value: 'postgres', label: 'PostgreSQL – Object-relational database' },
  { value: 'mysql', label: 'MySQL – Relational database' },
  { value: 'mariadb', label: 'MariaDB – MySQL-compatible open source database' },
  { value: 'redis', label: 'Redis – In-memory data structure store' },
  { value: 'cassandra', label: 'Cassandra – Distributed NoSQL database' },
  { value: 'cockroachdb', label: 'CockroachDB – Distributed SQL database' },
  { value: 'couchdb', label: 'CouchDB – Document-oriented NoSQL database' },
  { value: 'edgedb', label: 'EdgeDB – Next-generation relational database' },
  { value: 'neo4j', label: 'Neo4j – Graph database' },
  { value: 'surrealdb', label: 'SurrealDB – Multi-model database' },
  { value: 'yugabytedb', label: 'YugabyteDB – Distributed SQL database' },
];

export async function askDatabases(): Promise<DatabaseSetup[]> {
  const selectedDatabases = await multiselect({
    message: 'Select databases (space to select, enter to confirm):',
    options: databaseOptions,
    required: false,
  });

  if (isCancel(selectedDatabases)) {
    cancel('Database selection cancelled.');
    process.exit(0);
  }

  // Convert string array to DatabaseSetup array
  return (selectedDatabases as string[]).map(dbType => ({
    type: dbType as DatabaseType,
    name: dbType,
    port: getDefaultPort(dbType),
    containerName: `${dbType}_container`,
    networkName: 'local_dbs_network',
    volumeName: `${dbType}_data`
  }));
}

function getDefaultPort(dbType: string): number {
  const ports: Record<string, number> = {
    mongodb: 27017,
    postgres: 5432,
    postgresql: 5432,
    mysql: 3306,
    mariadb: 3306,
    redis: 6379,
    cassandra: 9042,
    cockroachdb: 26257,
    couchdb: 5984,
    edgedb: 5656,
    neo4j: 7474,
    surrealdb: 8000,
    yugabytedb: 5433
  };
  return ports[dbType] || 8080;
}
