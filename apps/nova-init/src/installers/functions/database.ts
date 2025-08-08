import { multiselect, isCancel, cancel } from '@clack/prompts';

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

export async function askDatabases(): Promise<string[]> {
  const databases = await multiselect({
    message: 'Select databases (space to select, enter to confirm):',
    options: databaseOptions,
    required: false,
  });

  if (isCancel(databases)) {
    cancel('Database selection cancelled.');
    process.exit(0);
  }

  return databases as string[];
}
