export type DatabaseType = 
  | 'mongodb' 
  | 'postgres' 
  | 'postgresql' 
  | 'mysql' 
  | 'mariadb' 
  | 'redis' 
  | 'cassandra' 
  | 'neo4j' 
  | 'couchdb' 
  | 'edgedb' 
  | 'surrealdb' 
  | 'yugabytedb' 
  | 'cockroachdb';

export interface DatabaseParameter {
  type: 'string' | 'number' | 'boolean';
  default: string | number | boolean;
  description: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
  };
}

export interface DatabaseConfig {
  name: string;
  description: string;
  image: string;
  defaultPort: number;
  internalPort: number;
  parameters: Record<string, DatabaseParameter>;
  dockerCompose: DockerComposeConfig;
  connectionInfo: ConnectionInfo;
}

export interface DockerComposeConfig {
  version: string;
  services: Record<string, DockerService>;
  networks?: Record<string, DockerNetwork>;
  volumes?: Record<string, DockerVolume>;
}

export interface DockerService {
  image: string;
  container_name?: string;
  command?: string;
  environment?: Record<string, string>;
  healthcheck?: HealthCheck;
  networks?: string[];
  ports?: string[];
  volumes?: string[];
  depends_on?: string[];
}

export interface DockerNetwork {
  driver: string;
  name?: string;
  external?: boolean;
}

export interface DockerVolume {
  driver: string;
  name?: string;
  external?: boolean;
}

export interface HealthCheck {
  test: string | string[];
  retries: number;
  timeout: string;
  interval?: string;
  start_period?: string;
}

export interface ConnectionInfo {
  host: string;
  port: string;
  database?: string;
  username?: string;
  password?: string;
  connectionString: string;
  webInterface?: string;
  keyspace?: string;
}

export interface DatabaseSetup {
  type: DatabaseType;
  name: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  containerName?: string;
  networkName?: string;
  volumeName?: string;
  customOptions?: Record<string, any>;
}
