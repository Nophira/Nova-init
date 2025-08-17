import consola from 'consola';
import * as fs from 'fs/promises';
import path from 'path';
import { 
  generateDockerComposeFromJson, 
  getAvailableDatabases, 
  getDatabaseParameters,
  getConnectionInfo 
} from '../../installers/database/json-docker-generator.js';

export async function addDatabase(options: any): Promise<void> {
  consola.info(`Adding database ${options.database}`);

  const projectPath = process.cwd();
  const dbPath = path.join(projectPath, options.folder || 'db');

  try {
    await fs.mkdir(dbPath, { recursive: true });
    consola.success(`Created database directory: ${dbPath}`);

    // Sammle alle benutzerdefinierten Parameter
    const customOptions: Record<string, any> = {};
    
    // Extrahiere Parameter aus den Optionen
    const availableParams = await getDatabaseParameters(options.database);
    
    for (const [paramName, paramConfig] of Object.entries(availableParams)) {
      if (options[paramName] !== undefined) {
        customOptions[paramName] = options[paramName];
      }
    }

    // Generiere Docker-Compose mit benutzerdefinierten Optionen
    const dockerComposeContent = await generateDockerComposeFromJson(options.database, customOptions);
    await fs.writeFile(path.join(dbPath, 'docker-compose.yml'), dockerComposeContent);

    // Erstelle eine README-Datei mit Verbindungsinformationen
    const readmeContent = await generateDatabaseReadme(options.database, customOptions);
    await fs.writeFile(path.join(dbPath, 'README.md'), readmeContent);

    consola.success(`✅ Database (${options.database}) added successfully`);
    consola.info(`📁 Database files created in: ${dbPath}`);
    consola.info(`📖 Check README.md for connection details`);
  } catch (error) {
    consola.error(`❌ Failed to add database: ${error}`);
  }
}

async function generateDatabaseReadme(database: string, options: Record<string, any>): Promise<string> {
  const connectionInfo = await getConnectionInfo(database, options);
  
  let readme = `# ${database.toUpperCase()} Database Setup\n\n`;
  readme += `This directory contains the Docker Compose configuration for ${database}.\n\n`;
  
  readme += `## Quick Start\n\n`;
  readme += ````bash\n`;
  readme += `# Start the database\n`;
  readme += `docker-compose up -d\n\n`;
  readme += `# Stop the database\n`;
  readme += `docker-compose down\n\n`;
  readme += `# View logs\n`;
  readme += `docker-compose logs -f\n`;
  readme += ````\n\n`;
  
  readme += `## Connection Details\n\n`;
  
  // Verwende die Verbindungsinformationen aus der JSON-Konfiguration
  for (const [key, value] of Object.entries(connectionInfo)) {
    if (key === 'connectionString') {
      readme += `**Connection String:**\n`;
      readme += `${value}\n\n`;
    } else if (key === 'webInterface') {
      readme += `**Web Interface:** ${value}\n\n`;
    } else {
      readme += `- **${key.charAt(0).toUpperCase() + key.slice(1)}:** ${value}\n`;
    }
  }
  
  readme += `## Configuration\n\n`;
  readme += `You can customize the database configuration by modifying the \`docker-compose.yml\` file or by passing parameters when adding the database:\n\n`;
  readme += ````bash\n`;
  readme += `nova-init add database --database ${database} --port 5432 --username myuser --password mypass\n`;
  readme += ````\n\n`;
  
  readme += `## Available Parameters\n\n`;
  readme += `| Parameter | Type | Default | Description |\n`;
  readme += `|-----------|------|---------|-------------|\n`;
  
  // Lade die verfügbaren Parameter aus der JSON-Konfiguration
  const parameters = await getDatabaseParameters(database);
  for (const [paramName, paramConfig] of Object.entries(parameters)) {
    readme += `| ${paramName} | ${paramConfig.type} | ${paramConfig.default} | ${paramConfig.description} |\n`;
  }
  
  readme += `\n## Troubleshooting\n\n`;
  readme += `1. **Port already in use:** Change the port using the \`--port\` parameter\n`;
  readme += `2. **Container won't start:** Check the logs with \`docker-compose logs\`\n`;
  readme += `3. **Connection refused:** Ensure the container is running with \`docker-compose ps\`\n\n`;
  
  return readme;
}
