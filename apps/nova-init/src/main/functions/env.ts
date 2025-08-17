import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import type { ProjectStructure } from '../../types/index.js';

export async function createEnvExample(projectPath: string, config: ProjectStructure): Promise<void> {
  const envContent = generateEnvContent(config);
  
  try {
    await writeFile(path.join(projectPath, '.env.example'), envContent);
  } catch (error) {
    throw new Error(`Failed to create .env.example: ${error}`);
  }
}

export async function createNovaInitJson(projectPath: string, config: ProjectStructure): Promise<void> {
  const novaInitContent = JSON.stringify(config, null, 2);
  
  try {
    await writeFile(path.join(projectPath, 'nova-init.json'), novaInitContent);
  } catch (error) {
    throw new Error(`Failed to create nova-init.json: ${error}`);
  }
}

function generateEnvContent(config: ProjectStructure): string {
  let envContent = `# ============================================================================
# NOVA-INIT ENVIRONMENT VARIABLES
# ============================================================================
# Copy this file to .env and fill in your actual values
# ============================================================================

# PROJECT CONFIGURATION
# ============================================================================
PROJECT_NAME=${config.projectName}
NODE_ENV=development

# ============================================================================
# FRONTEND CONFIGURATION
# ============================================================================
`;

  if (config.frontend) {
    envContent += `FRONTEND_LANGUAGE=${config.frontend.language}
FRONTEND_FRAMEWORK=${config.frontend.framework}
FRONTEND_PORT=3000
`;
  }

  envContent += `
# ============================================================================
# BACKEND CONFIGURATION
# ============================================================================
`;

  if (config.backend) {
    envContent += `BACKEND_LANGUAGE=${config.backend.language}
BACKEND_FRAMEWORK=${config.backend.framework}
BACKEND_PORT=5000
BACKEND_USE_MICROSERVICES=${config.backend.useMicroservices}
`;

    if (config.backend.microserviceNames) {
      envContent += `# MICROSERVICE PORTS
${config.backend.microserviceNames.map((service, index) => 
  `${service.toUpperCase()}_PORT=${5001 + index}`
).join('\n')}
`;
    }
  }

  envContent += `
# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================
`;

  if (config.databases.length > 0) {
    config.databases.forEach((db, index) => {
      envContent += `# ${db.type.toUpperCase()} DATABASE
${db.type.toUpperCase()}_HOST=localhost
${db.type.toUpperCase()}_PORT=${db.port || 5432}
`;

      if (db.database) {
        envContent += `${db.type.toUpperCase()}_DATABASE=${db.database}
`;
      }

      if (db.username) {
        envContent += `${db.type.toUpperCase()}_USERNAME=${db.username}
`;
      }

      if (db.password) {
        envContent += `${db.type.toUpperCase()}_PASSWORD=${db.password}
`;
      }

      envContent += `
`;
    });
  }

  envContent += `# ============================================================================
# DOCKER CONFIGURATION
# ============================================================================
DOCKER_NETWORK_NAME=local_dbs_network
DOCKER_VOLUME_PREFIX=local_db_data

# ============================================================================
# GIT CONFIGURATION
# ============================================================================
GIT_AUTHOR_NAME=Your Name
GIT_AUTHOR_EMAIL=your.email@example.com

# ============================================================================
# ADDITIONAL CONFIGURATION
# ============================================================================
# Add any additional environment variables your project needs below
`;

  return envContent;
}

export async function createProjectStructure(projectPath: string, config: ProjectStructure): Promise<void> {
  try {
    // Create main directories
    if (config.frontend) {
      await mkdir(path.join(projectPath, config.frontend.folderName || 'frontend'), { recursive: true });
    }

    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
        for (const service of config.backend.microserviceNames) {
          await mkdir(path.join(projectPath, 'services', service), { recursive: true });
        }
      } else {
        await mkdir(path.join(projectPath, config.backend.folderName || 'backend'), { recursive: true });
      }
    }

    // Create database directory
    if (config.databases.length > 0) {
      await mkdir(path.join(projectPath, 'db'), { recursive: true });
    }

    // Create docker directory if hosting is enabled
    if (config.hosting === 'docker') {
      await mkdir(path.join(projectPath, 'docker'), { recursive: true });
    }

  } catch (error) {
    throw new Error(`Failed to create project structure: ${error}`);
  }
}
