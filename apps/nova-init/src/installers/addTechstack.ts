import consola from 'consola';
import * as path from 'path';
import * as fs from 'fs/promises';
import { installReact } from './frameworks/frontend/react.js';
import { installExpress } from './frameworks/backend/express.js';
import { generateDatabaseCompose } from './database/docker-compose.js';

interface TechstackOptions {
  techstack?: string;
  folder?: string;
}

interface TechstackConfig {
  frontend: {
    framework: string;
    language: string;
    useVite?: boolean;
  };
  backend: {
    framework: string;
    language: string;
  };
  database: string;
}

export async function addTechstack(options: TechstackOptions) {
  const { techstack, folder = 'techstack-app' } = options;

  if (!techstack) {
    consola.error('Tech stack is required. Use --techstack <stack>');
    process.exit(1);
  }

  const targetPath = path.resolve(process.cwd(), folder);

  consola.info(`🚀 Adding tech stack: ${techstack} in ${folder}`);

  try {
    // Create project folder
    await fs.mkdir(targetPath, { recursive: true });

    // Parse tech stack configuration
    const config = parseTechStack(techstack);
    if (!config) {
      consola.error(`Unknown tech stack: ${techstack}`);
      consola.info('Available stacks: MERN, MEAN, MEVN, MERN_TS, MEAN_TS, MEVN_TS');
      process.exit(1);
    }

    // Setup frontend
    consola.info(`🎨 Setting up frontend: ${config.frontend.framework} (${config.frontend.language})`);
    const frontendPath = path.join(targetPath, 'frontend');
    await fs.mkdir(frontendPath, { recursive: true });
    
    if (config.frontend.framework === 'react') {
      await installReact(frontendPath, 'frontend', config.frontend.language, config.frontend.useVite);
    } else {
      // For other frameworks, you would call their respective installers
      consola.warn(`Frontend framework ${config.frontend.framework} not yet implemented for tech stacks`);
    }

    // Setup backend
    consola.info(`🛠 Setting up backend: ${config.backend.framework} (${config.backend.language})`);
    const backendPath = path.join(targetPath, 'backend');
    await fs.mkdir(backendPath, { recursive: true });
    
    if (config.backend.framework === 'express') {
      await installExpress(backendPath, config.backend.language);
    } else {
      consola.warn(`Backend framework ${config.backend.framework} not yet implemented for tech stacks`);
    }

    // Setup database
    consola.info(`🗄 Setting up database: ${config.database}`);
    const dbPath = path.join(targetPath, 'db');
    await fs.mkdir(dbPath, { recursive: true });
    
    const composeContent = await generateDatabaseCompose(config.database);
    await fs.writeFile(path.join(dbPath, 'docker-compose.yml'), composeContent);

    // Create project configuration
    const projectConfig = {
      name: folder,
      techstack: techstack,
      components: {
        frontend: {
          framework: config.frontend.framework,
          language: config.frontend.language,
          path: 'frontend'
        },
        backend: {
          framework: config.backend.framework,
          language: config.backend.language,
          path: 'backend'
        },
        database: {
          type: config.database,
          path: 'db'
        }
      },
      created: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(targetPath, 'nova-init.json'),
      JSON.stringify(projectConfig, null, 2)
    );

    // Create root package.json
    const rootPackageJson = {
      name: folder,
      version: "1.0.0",
      description: `Generated with Nova Init - ${techstack} stack`,
      scripts: {
        "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
        "dev:frontend": "cd frontend && npm run dev",
        "dev:backend": "cd backend && npm start",
        "build": "npm run build:frontend && npm run build:backend",
        "build:frontend": "cd frontend && npm run build",
        "build:backend": "cd backend && npm run build",
        "db:up": "cd db && docker-compose up -d",
        "db:down": "cd db && docker-compose down",
        "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install"
      },
      devDependencies: {
        "concurrently": "^8.2.2"
      }
    };

    await fs.writeFile(
      path.join(targetPath, 'package.json'),
      JSON.stringify(rootPackageJson, null, 2)
    );

    // Create README
    const readmeContent = `# ${folder}

This project was generated using Nova Init with the ${techstack} tech stack.

## 🚀 Quick Start

1. Install dependencies:
   \`\`\`bash
   npm run install:all
   \`\`\`

2. Start the database:
   \`\`\`bash
   npm run db:up
   \`\`\`

3. Start development servers:
   \`\`\`bash
   npm run dev
   \`\`\`

## 📁 Project Structure

- \`frontend/\` - ${config.frontend.framework} (${config.frontend.language})
- \`backend/\` - ${config.backend.framework} (${config.backend.language})
- \`db/\` - ${config.database} database

## 🛠 Available Scripts

- \`npm run dev\` - Start both frontend and backend in development mode
- \`npm run build\` - Build both frontend and backend
- \`npm run db:up\` - Start database containers
- \`npm run db:down\` - Stop database containers

## 📚 Tech Stack

- **Frontend**: ${config.frontend.framework} (${config.frontend.language})
- **Backend**: ${config.backend.framework} (${config.backend.language})
- **Database**: ${config.database}
- **Generated by**: Nova Init CLI
`;

    await fs.writeFile(path.join(targetPath, 'README.md'), readmeContent);

    consola.success(`✅ Tech stack ${techstack} added successfully in ${folder}`);
    consola.info(`📁 Next steps:`);
    consola.info(`   cd ${folder}`);
    consola.info(`   npm run install:all`);
    consola.info(`   npm run db:up`);
    consola.info(`   npm run dev`);
  } catch (error) {
    consola.error(`❌ Failed to add tech stack ${techstack}:`, error);
    process.exit(1);
  }
}

function parseTechStack(techstack: string): TechstackConfig | null {
  const configs: { [key: string]: TechstackConfig } = {
    'MERN': {
      frontend: { framework: 'react', language: 'JavaScript' },
      backend: { framework: 'express', language: 'JavaScript' },
      database: 'mongodb'
    },
    'MEAN': {
      frontend: { framework: 'angular', language: 'TypeScript' },
      backend: { framework: 'express', language: 'JavaScript' },
      database: 'mongodb'
    },
    'MEVN': {
      frontend: { framework: 'vue', language: 'JavaScript' },
      backend: { framework: 'express', language: 'JavaScript' },
      database: 'mongodb'
    },
    'MERN_TS': {
      frontend: { framework: 'react', language: 'TypeScript', useVite: true },
      backend: { framework: 'express', language: 'TypeScript' },
      database: 'mongodb'
    },
    'MEAN_TS': {
      frontend: { framework: 'angular', language: 'TypeScript' },
      backend: { framework: 'express', language: 'TypeScript' },
      database: 'mongodb'
    },
    'MEVN_TS': {
      frontend: { framework: 'vue', language: 'TypeScript' },
      backend: { framework: 'express', language: 'TypeScript' },
      database: 'mongodb'
    }
  };

  return configs[techstack.toUpperCase()] || null;
}
