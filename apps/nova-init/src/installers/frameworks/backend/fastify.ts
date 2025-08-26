import consola from 'consola';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import * as path from 'path';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// Fastify framework configuration
const FASTIFY_CONFIG = {
  name: 'Fastify',
  supportedLanguages: ['javascript', 'typescript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  dependencies: {
    common: ['fastify'],
  },
  devDependencies: {
    typescript: ['typescript', '@types/node', 'ts-node-dev'],
    javascript: [],
  },
  scripts: {
    dev: 'node src/index.js',
    build: 'tsc',
    start: 'node dist/index.js',
  },
};

export async function installFastify(
  targetPath: string, 
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
) {
  try {
    // Validate language support
    if (!FASTIFY_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Fastify does not support language: ${language}. Supported: ${FASTIFY_CONFIG.supportedLanguages.join(', ')}`);
    }
    
    // Validate package manager support
    if (!FASTIFY_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Fastify does not support package manager: ${packageManager}. Supported: ${FASTIFY_CONFIG.supportedPackageManagers.join(', ')}`);
    }
    
    consola.info(`📦 Installing Fastify (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    // Initialize project with package manager
    PackageManagerUtils.initProject(packageManager, targetPath);
    
    // Install main dependencies
    const mainDependencies = FASTIFY_CONFIG.dependencies.common;
    PackageManagerUtils.installDependencies(packageManager, mainDependencies, targetPath, false);
    
    if (language === 'typescript') {
      consola.info('⚙️ Setting up TypeScript configuration...');
      
      // Install TypeScript dev dependencies
      const tsDevDependencies = FASTIFY_CONFIG.devDependencies.typescript;
      PackageManagerUtils.installDependencies(packageManager, tsDevDependencies, targetPath, true);
      
      // Initialize TypeScript configuration
      PackageManagerUtils.execCommand('npx tsc --init', targetPath);

      const tsConfig = {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
      };

      writeFileSync(
        path.join(targetPath, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
      );

      // Create src directory and main file
      mkdirSync(path.join(targetPath, 'src'), { recursive: true });
      const mainContent = `import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

const PORT = process.env.PORT || ${FASTIFY_CONFIG.defaultPort};

// Declare a route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify with TypeScript!' };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    fastify.log.info(\`Server running on port \${PORT}\`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
`;
      writeFileSync(path.join(targetPath, 'src/index.ts'), mainContent);

    } else {
      consola.info('⚙️ Setting up JavaScript configuration...');

      // Create src directory and main file
      mkdirSync(path.join(targetPath, 'src'), { recursive: true });
      const mainContent = `import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

const PORT = process.env.PORT || ${FASTIFY_CONFIG.defaultPort};

// Declare a route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify with JavaScript!' };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(\`Server running on port \${PORT}\`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
`;
      writeFileSync(path.join(targetPath, 'src/index.js'), mainContent);
    }
    
    // Update package.json with configured scripts
    const packageJsonPath = path.join(targetPath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    
    // Add module type for JavaScript
    if (language === 'javascript') {
      packageJson.type = 'module';
    }
    
    // Use configuration scripts with appropriate file extension
    const fileExt = language === 'typescript' ? 'ts' : 'js';
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: language === 'typescript' ? 
        'ts-node-dev --respawn --transpile-only src/index.ts' : 
        FASTIFY_CONFIG.scripts.dev.replace('index.js', `src/index.${fileExt}`),
      build: language === 'typescript' ? FASTIFY_CONFIG.scripts.build : undefined,
      start: language === 'typescript' ? 
        FASTIFY_CONFIG.scripts.start : 
        FASTIFY_CONFIG.scripts.start.replace('dist/index.js', `src/index.${fileExt}`)
    };
    
    // Remove undefined scripts
    Object.keys(packageJson.scripts).forEach(key => {
      if (packageJson.scripts[key] === undefined) {
        delete packageJson.scripts[key];
      }
    });
    
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Create environment file
    const envContent = `# Server Configuration
PORT=${FASTIFY_CONFIG.defaultPort}
NODE_ENV=development
`;
    writeFileSync(path.join(targetPath, '.env.example'), envContent);
    
    consola.success(`✅ Fastify (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Fastify:`, error);
    throw error;
  }
}

// Export configuration for external access if needed
export const getFastifyConfig = () => FASTIFY_CONFIG;
