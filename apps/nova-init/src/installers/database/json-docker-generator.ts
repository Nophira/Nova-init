import * as fs from 'fs/promises';
import path from 'path';
import consola from 'consola';

interface DatabaseParameter {
  type: string;
  default: string | number;
  description: string;
}

interface DatabaseConfig {
  name: string;
  description: string;
  image: string;
  defaultPort: number;
  internalPort: number;
  parameters: Record<string, DatabaseParameter>;
  dockerCompose: any;
  connectionInfo: Record<string, string>;
}

export async function loadDatabaseConfig(database: string): Promise<DatabaseConfig> {
  try {
    const configPath = path.join(__dirname, 'docker', `${database.toLowerCase()}.json`);
    const configContent = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    throw new Error(`Konfiguration für Datenbank '${database}' nicht gefunden`);
  }
}

export async function getAvailableDatabases(): Promise<string[]> {
  try {
    const dockerPath = path.join(__dirname, 'docker');
    const files = await fs.readdir(dockerPath);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    consola.error('Fehler beim Laden der verfügbaren Datenbanken:', error);
    return [];
  }
}

export async function generateDockerComposeFromJson(
  database: string,
  customOptions: Record<string, any> = {}
): Promise<string> {
  try {
    const config = await loadDatabaseConfig(database);
    
    // Verwende Standardwerte und überschreibe mit benutzerdefinierten Optionen
    const options: Record<string, any> = {};
    
    // Setze Standardwerte
    for (const [paramName, paramConfig] of Object.entries(config.parameters)) {
      options[paramName] = paramConfig.default;
    }
    
    // Überschreibe mit benutzerdefinierten Optionen
    Object.assign(options, customOptions);

    // Konvertiere JSON zu YAML-String
    const dockerComposeYaml = convertJsonToYaml(config.dockerCompose, options);
    
    return dockerComposeYaml;
  } catch (error) {
    consola.error(`Fehler beim Generieren der Docker-Compose für ${database}:`, error);
    throw error;
  }
}

function convertJsonToYaml(obj: any, options: Record<string, any>, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  let yaml = '';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        yaml += `${spaces}- ${convertJsonToYaml(item, options, indent + 1).trim()}\n`;
      } else {
        yaml += `${spaces}- ${resolveTemplate(item.toString(), options)}\n`;
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        yaml += `${spaces}${key}:\n${convertJsonToYaml(value, options, indent + 1)}`;
      } else if (Array.isArray(value)) {
        yaml += `${spaces}${key}:\n${convertJsonToYaml(value, options, indent + 1)}`;
      } else {
        const resolvedValue = resolveTemplate(value.toString(), options);
        yaml += `${spaces}${key}: ${resolvedValue}\n`;
      }
    }
  }

  return yaml;
}

function resolveTemplate(template: string, options: Record<string, any>): string {
  return template.replace(/\$\{([^}]+)\}/g, (match, key) => {
    return options[key]?.toString() || match;
  });
}

export async function getDatabaseParameters(database: string): Promise<Record<string, DatabaseParameter>> {
  try {
    const config = await loadDatabaseConfig(database);
    return config.parameters;
  } catch (error) {
    consola.error(`Fehler beim Laden der Parameter für ${database}:`, error);
    return {};
  }
}

export async function getConnectionInfo(
  database: string, 
  options: Record<string, any> = {}
): Promise<Record<string, string>> {
  try {
    const config = await loadDatabaseConfig(database);
    
    // Verwende Standardwerte und überschreibe mit benutzerdefinierten Optionen
    const resolvedOptions: Record<string, any> = {};
    
    // Setze Standardwerte
    for (const [paramName, paramConfig] of Object.entries(config.parameters)) {
      resolvedOptions[paramName] = paramConfig.default;
    }
    
    // Überschreibe mit benutzerdefinierten Optionen
    Object.assign(resolvedOptions, options);

    // Löse Template-Variablen in connectionInfo auf
    const connectionInfo: Record<string, string> = {};
    for (const [key, value] of Object.entries(config.connectionInfo)) {
      connectionInfo[key] = resolveTemplate(value, resolvedOptions);
    }

    return connectionInfo;
  } catch (error) {
    consola.error(`Fehler beim Laden der Verbindungsinformationen für ${database}:`, error);
    return {};
  }
}
