import { select, text, confirm, isCancel, cancel } from '@clack/prompts';
import type { DatabaseType, DatabaseSetup } from '../../types/index.js';
import { getAvailableDatabases, getDatabaseParameters } from '../../installers/database/databasedocker-generator.js';

export async function askDatabaseSelection(): Promise<DatabaseType[]> {
  const availableDatabases = await getAvailableDatabases();
  
  if (!availableDatabases || availableDatabases.length === 0) {
    console.error('❌ No available databases found. Please check the database configuration files.');
    return [];
  }
  
  const databases = await select({
    message: 'Select databases to use (you can select multiple):',
    options: availableDatabases.map(db => ({ value: db, label: db })),
  });

  if (isCancel(databases)) {
    cancel('Database selection cancelled.');
    process.exit(0);
  }

  if (!databases || databases.length === 0) {
    return [];
  }

  // For now, we'll handle single selection and expand to multiple later
  return [databases as DatabaseType];
}

export async function askDatabaseConfiguration(databaseType: DatabaseType): Promise<DatabaseSetup> {
  const parameters = await getDatabaseParameters(databaseType);
  
  const config: DatabaseSetup = {
    type: databaseType,
    name: databaseType,
  };

  // Ask for container name
  const containerName = await text({
    message: `Container name for ${databaseType}:`,
    placeholder: `${databaseType}_db`,
    defaultValue: `${databaseType}_db`,
  });

  if (isCancel(containerName)) {
    cancel('Container name input cancelled.');
    process.exit(0);
  }

  config.containerName = containerName?.trim() || `${databaseType}_db`;

  // Ask for port
  const port = await text({
    message: `Port for ${databaseType}:`,
    placeholder: '5432',
    defaultValue: '5432',
  });

  if (isCancel(port)) {
    cancel('Port input cancelled.');
    process.exit(0);
  }

  config.port = parseInt(port?.trim() || '5432', 10);

  // Ask for network name
  const networkName = await text({
    message: `Network name for ${databaseType}:`,
    placeholder: 'local_dbs_network',
    defaultValue: 'local_dbs_network',
  });

  if (isCancel(networkName)) {
    cancel('Network name input cancelled.');
    process.exit(0);
  }

  config.networkName = networkName?.trim() || 'local_dbs_network';

  // Ask for volume name
  const volumeName = await text({
    message: `Volume name for ${databaseType}:`,
    placeholder: `${databaseType}_data`,
    defaultValue: `${databaseType}_data`,
  });

  if (isCancel(volumeName)) {
    cancel('Volume name input cancelled.');
    process.exit(0);
  }

  config.volumeName = volumeName?.trim() || `${databaseType}_data`;

  // Ask for database name (for SQL databases)
  if (['postgres', 'mysql', 'mariadb', 'cockroachdb'].includes(databaseType)) {
    const database = await text({
      message: `Database name for ${databaseType}:`,
      placeholder: 'local',
      defaultValue: 'local',
    });

    if (isCancel(database)) {
      cancel('Database name input cancelled.');
      process.exit(0);
    }

    config.database = database?.trim() || 'local';
  }

  // Ask for username (for SQL databases)
  if (['postgres', 'mysql', 'mariadb', 'cockroachdb'].includes(databaseType)) {
    const username = await text({
      message: `Username for ${databaseType}:`,
      placeholder: 'admin',
      defaultValue: 'admin',
    });

    if (isCancel(username)) {
      cancel('Username input cancelled.');
      process.exit(0);
    }

    config.username = username?.trim() || 'admin';
  }

  // Ask for password (for SQL databases)
  if (['postgres', 'mysql', 'mariadb', 'cockroachdb'].includes(databaseType)) {
    const password = await text({
      message: `Password for ${databaseType}:`,
      placeholder: 'password123',
      defaultValue: 'password123',
    });

    if (isCancel(password)) {
      cancel('Password input cancelled.');
      process.exit(0);
    }

    config.password = password?.trim() || 'password123';
  }

  return config;
}

export async function askDatabasesSetup(): Promise<DatabaseSetup[]> {
  const databases: DatabaseSetup[] = [];
  
  let addMore = true;
  while (addMore) {
    const databaseType = await askDatabaseSelection();
    if (databaseType.length === 0) {
      break;
    }

    for (const dbType of databaseType) {
      const config = await askDatabaseConfiguration(dbType);
      databases.push(config);
    }

    const addMoreResult = await confirm({
      message: 'Do you want to add another database?',
    });

    if (isCancel(addMoreResult)) {
      cancel('Database setup cancelled.');
      process.exit(0);
    }

    addMore = addMoreResult as boolean;
  }

  return databases;
}

export function validateDatabaseType(databaseType: string): DatabaseType {
  const validTypes = [
    'mongodb', 'postgres', 'mysql', 'redis', 'neo4j', 'cassandra', 
    'couchdb', 'mariadb', 'cockroachdb', 'edgedb', 'surrealdb', 'yugabytedb'
  ];
  
  if (!validTypes.includes(databaseType)) {
    throw new Error(`Invalid database type. Must be one of: ${validTypes.join(', ')}`);
  }
  return databaseType as DatabaseType;
}

export function validateDatabasePort(port: number): number {
  if (port < 1 || port > 65535) {
    throw new Error('Port must be between 1 and 65535');
  }
  return port;
}
