import { select, cancel, isCancel } from '@clack/prompts';
import type { Database } from '../../types/types.js';

const databaseOptions: { label: string; value: Database }[] = [
  { label: 'MongoDB', value: 'mongodb' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'MySQL', value: 'mysql' },
  { label: 'MariaDB', value: 'mariadb' },
  { label: 'Redis', value: 'redis' },
  { label: 'Cassandra', value: 'cassandra' },
  { label: 'CockroachDB', value: 'cockroachdb' },
  { label: 'CouchDB', value: 'couchdb' },
  { label: 'EdgeDB', value: 'edgedb' },
  { label: 'Neo4j', value: 'neo4j' },
  { label: 'SurrealDB', value: 'surrealdb' },
  { label: 'YugabyteDB', value: 'yugabytedb' },
  { label: 'None ( Skip )', value: 'none' as Database },
];

export async function promptDatabase(): Promise<Database> {
  const database = await select({
    message: 'Select a database:',
    options: databaseOptions,
  });

  if (isCancel(database)) {
    cancel('Database selection cancelled.');
    process.exit(0);
  }

  return database;
}
