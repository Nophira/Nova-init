import { execSync } from 'child_process';
import consola from 'consola';

// Centralized create commands for all frameworks and tools
export class CreateCommands {
  private static exec(cmd: string, cwd: string) {
    return execSync(cmd, { cwd, stdio: 'inherit' });
  }

  // Frontend Framework Create Commands
  static async createReact(targetPath: string, language: string, useVite: boolean = true) {
    consola.info(`⚛️ Creating React app (${language}) with ${useVite ? 'Vite' : 'Create React App'}...`);
    
    if (useVite) {
      const templateFlag = language === 'typescript' ? '-- --template react-ts' : '-- --template react';
      this.exec(`npm create vite@latest . ${templateFlag}`, targetPath);
    } else {
      const templateFlag = language === 'typescript' ? '--template typescript' : '';
      this.exec(`npx create-react-app . ${templateFlag}`, targetPath);
    }
  }

  static async createNextJs(targetPath: string, language: string) {
    consola.info(`⚡ Creating Next.js app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '--typescript' : '--javascript';
    this.exec(`npx create-next-app@latest . ${templateFlag} --eslint --tailwind --app --src-dir --import-alias "@/*" --yes`, targetPath);
  }

  static async createVue(targetPath: string, language: string) {
    consola.info(`💚 Creating Vue app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '-- --template vue-ts' : '-- --template vue';
    this.exec(`npm create vue@latest . ${templateFlag}`, targetPath);
  }

  static async createSvelte(targetPath: string, language: string) {
    consola.info(`🎭 Creating Svelte app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '-- --template svelte-ts' : '-- --template svelte';
    this.exec(`npm create svelte@latest . ${templateFlag}`, targetPath);
  }

  static async createAngular(targetPath: string, language: string) {
    consola.info(`🅰️ Creating Angular app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '--typescript' : '--javascript';
    this.exec(`npx @angular/cli@latest new . --routing --style=css ${templateFlag} --skip-git --yes`, targetPath);
  }

  static async createNuxtJs(targetPath: string, language: string) {
    consola.info(`🔥 Creating Nuxt.js app (${language})...`);
    
    this.exec(`npx nuxi@latest init . --yes`, targetPath);
  }

  static async createAstro(targetPath: string, language: string) {
    consola.info(`🚀 Creating Astro app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '-- --template minimal --typescript strict' : '-- --template minimal';
    this.exec(`npm create astro@latest . ${templateFlag}`, targetPath);
  }

  static async createRemix(targetPath: string, language: string) {
    consola.info(`⚡ Creating Remix app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '--typescript' : '--javascript';
    this.exec(`npx create-remix@latest . ${templateFlag} --yes`, targetPath);
  }

  static async createSolid(targetPath: string, language: string) {
    consola.info(`🧊 Creating Solid app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '-- --template ts' : '-- --template js';
    this.exec(`npm create solid@latest . ${templateFlag}`, targetPath);
  }

  static async createQwik(targetPath: string, language: string) {
    consola.info(`⚡ Creating Qwik app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '-- --template typescript' : '-- --template javascript';
    this.exec(`npm create qwik@latest . ${templateFlag}`, targetPath);
  }

  static async createPreact(targetPath: string, language: string) {
    consola.info(`⚡ Creating Preact app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '-- --template ts' : '-- --template js';
    this.exec(`npm create preact@latest . ${templateFlag}`, targetPath);
  }

  static async createLit(targetPath: string, language: string) {
    consola.info(`⚡ Creating Lit app (${language})...`);
    
    this.exec(`npm create lit@latest .`, targetPath);
  }

  // Backend Framework Create Commands
  static async createExpress(targetPath: string, language: string) {
    consola.info(`🚀 Creating Express.js app (${language})...`);
    
    // Initialize package.json
    this.exec('npm init -y', targetPath);
    
    // Install dependencies
    const dependencies = ['express', 'cors', 'helmet', 'morgan'];
    const devDependencies = ['nodemon'];
    
    if (language === 'typescript') {
      devDependencies.push('typescript', '@types/node', '@types/express', '@types/cors', '@types/morgan');
      dependencies.push('ts-node');
    }
    
    this.exec(`npm install ${dependencies.join(' ')}`, targetPath);
    this.exec(`npm install -D ${devDependencies.join(' ')}`, targetPath);
    
    // Create basic structure
    const srcDir = 'src';
    this.exec(`mkdir -p ${srcDir}`, targetPath);
    
    // Create main file
    const mainFile = language === 'typescript' ? 'src/index.ts' : 'src/index.js';
    const mainContent = language === 'typescript' 
      ? `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Express.js API is running!' });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});`
      : `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Express.js API is running!' });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});`;

    require('fs').writeFileSync(`${targetPath}/${mainFile}`, mainContent);
    
    // Create package.json scripts
    const packageJson = JSON.parse(require('fs').readFileSync(`${targetPath}/package.json`, 'utf8'));
    packageJson.scripts = {
      start: language === 'typescript' ? 'ts-node src/index.ts' : 'node src/index.js',
      dev: language === 'typescript' ? 'nodemon --exec ts-node src/index.ts' : 'nodemon src/index.js',
      build: language === 'typescript' ? 'tsc' : 'echo "No build step needed for JavaScript"'
    };
    
    require('fs').writeFileSync(`${targetPath}/package.json`, JSON.stringify(packageJson, null, 2));
    
    // Create tsconfig.json for TypeScript
    if (language === 'typescript') {
      const tsConfig = {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
      };
      require('fs').writeFileSync(`${targetPath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2));
    }
  }

  static async createNestJS(targetPath: string, language: string) {
    consola.info(`🦅 Creating NestJS app (${language})...`);
    
    const templateFlag = language === 'typescript' ? '--typescript' : '--javascript';
    this.exec(`npx @nestjs/cli@latest new . --package-manager npm --skip-git --yes ${templateFlag}`, targetPath);
  }

  static async createFastify(targetPath: string, language: string) {
    consola.info(`⚡ Creating Fastify app (${language})...`);
    
    // Initialize package.json
    this.exec('npm init -y', targetPath);
    
    // Install dependencies
    const dependencies = ['fastify', 'fastify-cors', 'fastify-helmet'];
    const devDependencies = ['nodemon'];
    
    if (language === 'typescript') {
      devDependencies.push('typescript', '@types/node');
      dependencies.push('ts-node');
    }
    
    this.exec(`npm install ${dependencies.join(' ')}`, targetPath);
    this.exec(`npm install -D ${devDependencies.join(' ')}`, targetPath);
    
    // Create basic structure
    const srcDir = 'src';
    this.exec(`mkdir -p ${srcDir}`, targetPath);
    
    // Create main file
    const mainFile = language === 'typescript' ? 'src/index.ts' : 'src/index.js';
    const mainContent = language === 'typescript' 
      ? `import Fastify from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';

const fastify = Fastify({
  logger: true
});

// Register plugins
fastify.register(cors);
fastify.register(helmet);

// Routes
fastify.get('/', async (request, reply) => {
  return { message: 'Fastify API is running!' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();`
      : `const fastify = require('fastify')({
  logger: true
});

// Register plugins
fastify.register(require('fastify-cors'));
fastify.register(require('fastify-helmet'));

// Routes
fastify.get('/', async (request, reply) => {
  return { message: 'Fastify API is running!' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();`;

    require('fs').writeFileSync(`${targetPath}/${mainFile}`, mainContent);
    
    // Create package.json scripts
    const packageJson = JSON.parse(require('fs').readFileSync(`${targetPath}/package.json`, 'utf8'));
    packageJson.scripts = {
      start: language === 'typescript' ? 'ts-node src/index.ts' : 'node src/index.js',
      dev: language === 'typescript' ? 'nodemon --exec ts-node src/index.ts' : 'nodemon src/index.js',
      build: language === 'typescript' ? 'tsc' : 'echo "No build step needed for JavaScript"'
    };
    
    require('fs').writeFileSync(`${targetPath}/package.json`, JSON.stringify(packageJson, null, 2));
    
    // Create tsconfig.json for TypeScript
    if (language === 'typescript') {
      const tsConfig = {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
      };
      require('fs').writeFileSync(`${targetPath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2));
    }
  }

  // Monorepo Create Commands
  static async createTurborepo(targetPath: string, packageManager: string) {
    consola.info('🚀 Creating Turborepo...');
    
    this.exec(`npx create-turbo@latest .`, targetPath);
  }

  static async createNx(targetPath: string, packageManager: string) {
    consola.info('⚡ Creating Nx workspace...');
    
    this.exec(`npx create-nx-workspace@latest . --preset=empty --packageManager=${packageManager} --nxCloud=false`, targetPath);
  }

  static async createLerna(targetPath: string, packageManager: string) {
    consola.info('📚 Creating Lerna monorepo...');
    
    if (packageManager === 'pnpm') {
      this.exec('pnpm dlx lerna init', targetPath);
    } else {
      this.exec('npx lerna init', targetPath);
    }
    
    // Initialize package.json if it doesn't exist
    try {
      this.exec(`${packageManager} init -y`, targetPath);
    } catch (error) {
      // Package.json might already exist
    }
  }

  // Database Create Commands
  static async createDatabase(targetPath: string, database: string) {
    consola.info(`🗄️ Creating ${database} configuration...`);
    
    // This would integrate with the existing database docker-compose generators
    // For now, just create the directory structure
    this.exec(`mkdir -p ${targetPath}`, targetPath);
    
    // Create a basic docker-compose.yml placeholder
    const dockerCompose = `# ${database} configuration
# Use nova-init add database --database ${database} for full setup
version: '3.8'
services:
  ${database}:
    image: ${database}:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
    volumes:
      - ${database}_data:/data

volumes:
  ${database}_data:`;

    require('fs').writeFileSync(`${targetPath}/docker-compose.yml`, dockerCompose);
  }
}
