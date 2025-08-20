import * as fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import consola from 'consola';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const configPath = path.join(process.cwd(), 'src/installers/database/docker', `${database.toLowerCase()}.json`);
    const configContent = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    throw new Error(`Configuration for database '${database}' not found`);
  }
}

export async function getAvailableDatabases(): Promise<string[]> {
  try {
    const dockerPath = path.join(process.cwd(), 'src/installers/database/docker');
    const files = await fs.readdir(dockerPath);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    consola.error('Failed to load available databases:', error);
    return [];
  }
}

export async function generateDockerComposeFromJson(
  database: string,
  customOptions: Record<string, any> = {}
): Promise<string> {
  try {
    const config = await loadDatabaseConfig(database);
    const options = resolveOptions(config, customOptions);
    return jsonToYaml(config.dockerCompose, options);
  } catch (error) {
    consola.error(`Failed to generate docker-compose for ${database}:`, error);
    throw error;
  }
}

function resolveOptions(config: DatabaseConfig, overrides: Record<string, any>): Record<string, any> {
  const defaults: Record<string, any> = {};
  for (const [key, param] of Object.entries(config.parameters)) {
    defaults[key] = param.default;
  }
  return { ...defaults, ...overrides };
}

function jsonToYaml(node: any, options: Record<string, any>, indent: number = 0): string {
  const pad = '  '.repeat(indent);

  if (Array.isArray(node)) {
    return node
      .map(item => {
        if (isPlainObject(item)) {
          const child = jsonToYaml(item, options, indent + 1);
          return `${pad}-\n${child}`;
        }
        return `${pad}- ${resolveValue(item, options)}\n`;
      })
      .join('');
  }

  if (isPlainObject(node)) {
    return Object.entries(node)
      .map(([key, value]) => {
        if (Array.isArray(value) || isPlainObject(value)) {
          return `${pad}${key}:\n${jsonToYaml(value, options, indent + 1)}`;
        }
        return `${pad}${key}: ${resolveValue(value, options)}\n`;
      })
      .join('');
  }

  return `${pad}${resolveValue(node, options)}\n`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function resolveValue(value: unknown, options: Record<string, any>): string {
  if (typeof value === 'string') return resolveTemplate(value, options);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value == null) return '';
  return resolveTemplate(String(value), options);
}

function resolveTemplate(template: string, options: Record<string, any>): string {
  return template.replace(/\$\{([^}]+)\}/g, (_match, key) => {
    const raw = options[key];
    return raw !== undefined && raw !== null ? String(raw) : _match;
  });
}

export async function getDatabaseParameters(database: string): Promise<Record<string, DatabaseParameter>> {
  try {
    const config = await loadDatabaseConfig(database);
    return config.parameters;
  } catch (error) {
    consola.error(`Failed to load parameters for ${database}:`, error);
    return {};
  }
}

export async function getConnectionInfo(
  database: string,
  options: Record<string, any> = {}
): Promise<Record<string, string>> {
  try {
    const config = await loadDatabaseConfig(database);
    const resolved = resolveOptions(config, options);

    const info: Record<string, string> = {};
    for (const [key, template] of Object.entries(config.connectionInfo)) {
      info[key] = resolveTemplate(template, resolved);
    }
    return info;
  } catch (error) {
    consola.error(`Failed to load connection info for ${database}:`, error);
    return {};
  }
}
