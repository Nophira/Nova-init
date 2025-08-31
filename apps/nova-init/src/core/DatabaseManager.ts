import fs from 'fs-extra';
import path from 'path';
import type { DatabaseSetup } from '../types/index.js';

export class DatabaseManager {
  async setupDatabases(projectPath: string, databases: DatabaseSetup[]): Promise<void> {
    try {
      console.log('🗄️  Richte Datenbanken ein...');
      
      const dbPath = path.join(projectPath, 'DB');
      await fs.ensureDir(dbPath);
      

      await this.createDockerCompose(dbPath, databases);
      
  
      for (const db of databases) {
        await this.createDatabaseConfig(dbPath, db);
      }
      

      
      console.log('  ✅ Datenbanken erfolgreich eingerichtet');
      
    } catch (error) {
      console.error('  ❌ Fehler beim Einrichten der Datenbanken:', error);
      throw error;
    }
  }

  private async createDockerCompose(dbPath: string, databases: DatabaseSetup[]): Promise<void> {
    try {
  
      const { generateDockerCompose } = await import('../installers/database/databasedocker-generator.js');
      
      const composePath = path.join(dbPath, 'docker-compose.yml');
      await generateDockerCompose(databases, composePath);
      
      console.log(`  📝 Docker Compose erstellt: ${composePath}`);
      
    } catch (error) {
      console.error('  ⚠️  Fehler beim Verwenden des bestehenden Docker-Generators, verwende Fallback...');
      await this.createFallbackDockerCompose(dbPath, databases);
    }
  }

  private async createFallbackDockerCompose(dbPath: string, databases: DatabaseSetup[]): Promise<void> {
    const composePath = path.join(dbPath, 'docker-compose.yml');
    
    const composeContent = this.generateDockerComposeContent(databases);
    
    await fs.writeFile(composePath, composeContent, 'utf-8');
    console.log(`  📝 Fallback Docker Compose erstellt: ${composePath}`);
  }

  private generateDockerComposeContent(databases: DatabaseSetup[]): string {
    let content = `version: '3.8'

networks:
  local_dbs_network:
    driver: bridge

volumes:
`;

   
    for (const db of databases) {
      content += `  ${db.volumeName}:\n`;
    }

    content += `
services:
`;


    for (const db of databases) {
      content += this.generateDatabaseService(db);
    }

    return content;
  }

  private generateDatabaseService(db: DatabaseSetup): string {
    const serviceConfig = this.getDatabaseConfig(db.type);
    
    let service = `  ${db.containerName}:
    image: ${serviceConfig.image}
    container_name: ${db.containerName}
    restart: unless-stopped
    ports:
      - "${db.port}:${serviceConfig.defaultPort}"
    environment:
`;

    
    for (const [key, value] of Object.entries(serviceConfig.environment)) {
      service += `      ${key}: ${value}\n`;
    }


    if (serviceConfig.volumes.length > 0) {
      service += `    volumes:\n`;
      for (const volume of serviceConfig.volumes) {
        service += `      - ${volume}\n`;
      }
    }

   
    service += `    networks:
      - ${db.networkName}
`;

   
    if (serviceConfig.healthcheck) {
      service += `    healthcheck:
      test: ${JSON.stringify(serviceConfig.healthcheck.test)}
      interval: ${serviceConfig.healthcheck.interval}
      timeout: ${serviceConfig.healthcheck.timeout}
      retries: ${serviceConfig.healthcheck.retries}
      start_period: ${serviceConfig.healthcheck.startPeriod}
`;
    }

    service += '\n';
    return service;
  }

  private async createDatabaseConfig(dbPath: string, db: DatabaseSetup): Promise<void> {
    const configPath = path.join(dbPath, `${db.type}.config.js`);
    
    const configContent = this.generateDatabaseConfigContent(db);
    
    await fs.writeFile(configPath, configContent, 'utf-8');
    console.log(`  📝 Konfiguration erstellt: ${configPath}`);
  }

  private generateDatabaseConfigContent(db: DatabaseSetup): string {
    return `// ${db.type.toUpperCase()} Konfiguration
module.exports = {
  type: '${db.type}',
  host: process.env.${db.type.toUpperCase()}_HOST || 'localhost',
  port: process.env.${db.type.toUpperCase()}_PORT || ${db.port},
  username: process.env.${db.type.toUpperCase()}_USER || 'user',
  password: process.env.${db.type.toUpperCase()}_PASSWORD || 'password',
  database: process.env.${db.type.toUpperCase()}_DATABASE || '${db.name}',
  containerName: '${db.containerName}',
  networkName: '${db.networkName}',
  volumeName: '${db.volumeName}',
};
`;
  }

  private getDatabaseConfig(dbType: string): any {
    const configs: Record<string, any> = {
      postgres: {
        image: 'postgres:15-alpine',
        defaultPort: 5432,
        environment: {
          POSTGRES_USER: 'user',
          POSTGRES_PASSWORD: 'password',
          POSTGRES_DB: 'postgres',
        },
        volumes: ['postgres_data:/var/lib/postgresql/data'],
        healthcheck: {
          test: ['CMD-SHELL', 'pg_isready -U user -d postgres'],
          interval: '30s',
          timeout: '10s',
          retries: 3,
          startPeriod: '30s',
        },
      },
      mysql: {
        image: 'mysql:8.0',
        defaultPort: 3306,
        environment: {
          MYSQL_ROOT_PASSWORD: 'password',
          MYSQL_DATABASE: 'mysql',
          MYSQL_USER: 'user',
          MYSQL_PASSWORD: 'password',
        },
        volumes: ['mysql_data:/var/lib/mysql'],
        healthcheck: {
          test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost'],
          interval: '30s',
          timeout: '10s',
          retries: 3,
          startPeriod: '30s',
        },
      },
      mongodb: {
        image: 'mongo:6.0',
        defaultPort: 27017,
        environment: {
          MONGO_INITDB_ROOT_USERNAME: 'user',
          MONGO_INITDB_ROOT_PASSWORD: 'password',
        },
        volumes: ['mongodb_data:/data/db'],
        healthcheck: {
          test: ['CMD', 'mongosh', '--eval', 'db.adminCommand("ping")'],
          interval: '30s',
          timeout: '10s',
          retries: 3,
          startPeriod: '30s',
        },
      },
      redis: {
        image: 'redis:7-alpine',
        defaultPort: 6379,
        environment: {},
        volumes: ['redis_data:/data'],
        healthcheck: {
          test: ['CMD', 'redis-cli', 'ping'],
          interval: '30s',
          timeout: '10s',
          retries: 3,
          startPeriod: '30s',
        },
      },
      mariadb: {
        image: 'mariadb:10.11',
        defaultPort: 3306,
        environment: {
          MYSQL_ROOT_PASSWORD: 'password',
          MYSQL_DATABASE: 'mariadb',
          MYSQL_USER: 'user',
          MYSQL_PASSWORD: 'password',
        },
        volumes: ['mariadb_data:/var/lib/mysql'],
        healthcheck: {
          test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost'],
          interval: '30s',
          timeout: '10s',
          retries: 3,
          startPeriod: '30s',
        },
      },
      neo4j: {
        image: 'neo4j:5.11',
        defaultPort: 7687,
        environment: {
          NEO4J_AUTH: 'user/password',
          NEO4J_PLUGINS: '["apoc"]',
        },
        volumes: ['neo4j_data:/data', 'neo4j_logs:/logs'],
        healthcheck: {
          test: ['CMD-SHELL', 'cypher-shell -u user -p password "RETURN 1"'],
          interval: '30s',
          timeout: '10s',
          retries: 3,
          startPeriod: '30s',
        },
      },
    };

    return configs[dbType] || {
      image: `${dbType}:latest`,
      defaultPort: 5432,
      environment: {},
      volumes: [],
    };
  }


}
