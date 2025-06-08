import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const databaseConfigs = {
  mongodb: {
    compose: `version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password123
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:`,
    description: 'MongoDB - Dokumentenorientierte NoSQL-Datenbank'
  },
  postgres: {
    compose: `version: '3.8'

services:
  postgres:
    image: postgres:latest
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=password123
      - POSTGRES_DB=mydatabase
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
    description: 'PostgreSQL - Objektrelationale Datenbank'
  },
  mysql: {
    compose: `version: '3.8'

services:
  mysql:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=password123
      - MYSQL_DATABASE=mydatabase
      - MYSQL_USER=admin
      - MYSQL_PASSWORD=password123
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:`,
    description: 'MySQL - Relationale Datenbank'
  },
  redis: {
    compose: `version: '3.8'

services:
  redis:
    image: redis:latest
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:`,
    description: 'Redis - In-Memory Datenbank'
  }
};

export function createDockerCompose(targetPath, database) {
  try {
    const config = databaseConfigs[database.toLowerCase()];
    if (!config) {
      throw new Error(`Unbekannte Datenbank: ${database}`);
    }

    const dockerComposePath = path.join(targetPath, 'docker-compose.yml');
    
    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🐳 Erstelle Docker Compose für ${database}...`) + chalk.bold.cyan('                 ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

    fs.writeFileSync(dockerComposePath, config.compose);

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
  return Object.keys(databaseConfigs).map(db => ({
    name: db.charAt(0).toUpperCase() + db.slice(1),
    value: db,
    description: databaseConfigs[db].description
  }));
} 