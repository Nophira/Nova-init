import consola from 'consola';
import * as path from 'path';
import { execSync } from 'child_process';
import * as fs from 'fs/promises';

interface MonorepoOptions {
  tool?: string;
  folder?: string;
}

export async function addMonorepo(options: MonorepoOptions) {
  const { tool, folder = 'monorepo' } = options;

  if (!tool) {
    consola.error('Tool is required. Use --tool <tool>');
    process.exit(1);
  }

  const targetPath = path.resolve(process.cwd(), folder);

  consola.info(`📦 Adding monorepo: ${tool} in ${folder}`);

  try {
    // Create monorepo folder
    await fs.mkdir(targetPath, { recursive: true });

    switch (tool.toLowerCase()) {
      case 'turborepo':
        await setupTurborepo(targetPath);
        break;
      case 'nx':
        await setupNx(targetPath);
        break;
      case 'lerna':
        await setupLerna(targetPath);
        break;
      default:
        consola.error(`Unknown tool: ${tool}`);
        consola.info('Available tools: turborepo, nx, lerna');
        process.exit(1);
    }

    consola.success(`✅ Monorepo ${tool} added successfully in ${folder}`);
    consola.info(`📁 Next steps:`);
    consola.info(`   cd ${folder}`);
    consola.info(`   npm install`);
    consola.info(`   npm run dev`);
  } catch (error) {
    consola.error(`❌ Failed to add monorepo ${tool}:`, error);
    process.exit(1);
  }
}

async function setupTurborepo(targetPath: string) {
  consola.info('🚀 Setting up Turborepo...');
  
  const exec = (cmd: string) => execSync(cmd, { cwd: targetPath, stdio: 'inherit' });
  
  exec('npx create-turbo@latest . --yes');
  
  // Create additional configuration
  const turboConfig = {
    $schema: "https://turbo.build/schema.json",
    globalDependencies: ["**/.env.*local"],
    pipeline: {
      build: {
        dependsOn: ["^build"],
        outputs: [".next/**", "!.next/cache/**", "dist/**"]
      },
      lint: {},
      dev: {
        cache: false,
        persistent: true
      }
    }
  };
  
  await fs.writeFile(
    path.join(targetPath, 'turbo.json'),
    JSON.stringify(turboConfig, null, 2)
  );
}

async function setupNx(targetPath: string) {
  consola.info('⚡ Setting up Nx...');
  
  const exec = (cmd: string) => execSync(cmd, { cwd: targetPath, stdio: 'inherit' });
  
  exec('npx create-nx-workspace@latest . --preset=empty --packageManager=npm --nxCloud=false --yes');
  
  // Create additional configuration
  const nxConfig = {
    extends: "nx/presets/npm.json",
    affected: {
      defaultBase: "main"
    },
    tasksRunnerOptions: {
      default: {
        runner: "nx/tasks-runners/default",
        options: {
          cacheableOperations: ["build", "lint", "test", "e2e"]
        }
      }
    }
  };
  
  await fs.writeFile(
    path.join(targetPath, 'nx.json'),
    JSON.stringify(nxConfig, null, 2)
  );
}

async function setupLerna(targetPath: string) {
  consola.info('📚 Setting up Lerna...');
  
  const exec = (cmd: string) => execSync(cmd, { cwd: targetPath, stdio: 'inherit' });
  
  // Initialize npm project
  exec('npm init -y');
  
  // Install Lerna
  exec('npm install lerna --save-dev');
  
  // Initialize Lerna
  exec('npx lerna init');
  
  // Create Lerna configuration
  const lernaConfig = {
    version: "0.0.0",
    npmClient: "npm",
    useWorkspaces: true,
    packages: ["packages/*", "apps/*"]
  };
  
  await fs.writeFile(
    path.join(targetPath, 'lerna.json'),
    JSON.stringify(lernaConfig, null, 2)
  );
  
  // Update package.json
  const packageJsonPath = path.join(targetPath, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
  
  packageJson.workspaces = ["packages/*", "apps/*"];
  packageJson.scripts = {
    ...packageJson.scripts,
    "dev": "lerna run dev --parallel",
    "build": "lerna run build",
    "test": "lerna run test",
    "lint": "lerna run lint"
  };
  
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
