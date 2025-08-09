import consola from 'consola';
import * as path from 'path';
import * as fs from 'fs/promises';
import { generateDatabaseCompose } from './database/docker-compose.js';

interface DatabaseOptions {
  database?: string;
  folder?: string;
}

export async function addDatabase(options: DatabaseOptions) {
  const { database, folder = 'db' } = options;

  if (!database) {
    consola.error('Database is required. Use --database <database>');
    process.exit(1);
  }

  const targetPath = path.resolve(process.cwd(), folder);

  consola.info(`🗄 Adding database: ${database} in ${folder}`);

  try {
    // Create database folder
    await fs.mkdir(targetPath, { recursive: true });

    // Generate docker-compose.yml
    const composeContent = await generateDatabaseCompose(database);
    const composePath = path.join(targetPath, 'docker-compose.yml');
    
    await fs.writeFile(composePath, composeContent);

    // Create .env.example
    const envContent = `# Database Configuration
DB_HOST=localhost
DB_PORT=${getDbPort(database)}
DB_NAME=local
DB_USER=admin
DB_PASSWORD=password123

# Connection String
DATABASE_URL=${getConnectionString(database)}
`;

    const envPath = path.join(targetPath, '.env.example');
    await fs.writeFile(envPath, envContent);

    consola.success(`✅ Database ${database} added successfully in ${folder}`);
    consola.info(`📁 Next steps:`);
    consola.info(`   cd ${folder}`);
    consola.info(`   docker-compose up -d`);
    consola.info(`   # Database will be available at localhost:${getDbPort(database)}`);
  } catch (error) {
    consola.error(`❌ Failed to add database ${database}:`, error);
    process.exit(1);
  }
}

function getDbPort(database: string): string {
  const ports: { [key: string]: string } = {
    mongodb: '27017',
    postgresql: '5432',
    mysql: '3306',
    mariadb: '3306',
    redis: '6379',
    cassandra: '9042',
    cockroachdb: '26257',
    couchdb: '5984',
    edgedb: '5656',
    neo4j: '7474',
    surrealdb: '8000',
    yugabytedb: '5433'
  };
  
  return ports[database.toLowerCase()] || '5432';
}

function getConnectionString(database: string): string {
  const connections: { [key: string]: string } = {
    mongodb: 'mongodb://admin:password123@localhost:27017/local',
    postgresql: 'postgresql://admin:password123@localhost:5432/local',
    mysql: 'mysql://admin:password123@localhost:3306/local',
    mariadb: 'mysql://admin:password123@localhost:3306/local',
    redis: 'redis://localhost:6379',
    cassandra: 'cassandra://localhost:9042',
    cockroachdb: 'postgresql://admin:password123@localhost:26257/local',
    couchdb: 'http://admin:password123@localhost:5984',
    edgedb: 'edgedb://localhost:5656',
    neo4j: 'neo4j://localhost:7474',
    surrealdb: 'http://localhost:8000',
    yugabytedb: 'postgresql://admin:password123@localhost:5433/local'
  };
  
  return connections[database.toLowerCase()] || 'postgresql://admin:password123@localhost:5432/local';
}
