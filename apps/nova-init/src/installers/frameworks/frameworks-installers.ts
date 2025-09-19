import { PackageManagerUtils } from '../../core/PackageManagerUtils.js';
import type { Language, PackageManager, FrontendFramework, BackendFramework, BuildTool } from '../../types/index.js';
import { FrameworkInstallationError } from '../../types/index.js';

type FrontendCommandMap = Partial<
  Record<Language, Partial<Record<PackageManager, Record<string, string>>>>
>;

type BackendCommandMap = Partial<
  Record<Language, Partial<Record<PackageManager, string>>>
>;

interface FrameworkConfig {
  name: string;
  type: 'frontend' | 'backend';
  supportsVite?: boolean;
  commands: FrontendCommandMap | BackendCommandMap;
}


const FRAMEWORKS: Record<string, FrameworkConfig> = {
  // Frontend
  react: {
    name: 'React',
    type: 'frontend',
    supportsVite: true,
    commands: {
      typescript: {
        npm: { /* standard: 'npx create-react-app . --template typescript',*/ vite: 'npm create vite@latest . -- --template react-ts' },
        pnpm: { /*standard: 'pnpm dlx create-react-app . --template typescript',*/ vite: 'pnpm create vite .  --template react-ts' },
        bun: { /*standard: 'bunx create-react-app . --template typescript',*/ vite: 'bun create vite .  --template react-ts' },
      },
      javascript: {
        npm: { /*standard: 'npx create-react-app .', */vite: 'npm create vite@latest . -- --template react' },
        pnpm: { /*standard: 'pnpm dlx create-react-app .',*/ vite: 'pnpm create vite .  --template react' },
        bun: { /*standard: 'bunx create-react-app .',*/ vite: 'bun create vite .  --template react' },
      },
    }
  },
  vue: {
    name: 'Vue',
    type: 'frontend',
    supportsVite: true,
    commands: {
      javascript: {
        npm: { vite: 'npm create vite@latest . -- --template vue' },
        pnpm: { vite: 'pnpm create vite@latest .  --template vue' },
        bun: { vite: 'bun create vite . --template vue' },
      },
      typescript: {
        npm: { vite: 'npm create vite@latest . --  --template vue-ts' },
        pnpm: { vite: 'pnpm create vite@latest .  --template vue-ts' },
        bun: { vite: 'bun create vite . --template vue-ts' },
      },
    }
  },



  // Backend
  express: {
    name: 'Express',
    type: 'backend',
    commands: {
      javascript: {
        npm: 'npm init -y && npm install express',
        pnpm: 'npm init -y && pnpm add express',
        bun: 'npm init -y && npm install express',
      },
      typescript: {
        npm: 'npm init -y && npm install express typescript @types/node @types/express  && npm install ts-node ',
        pnpm: 'npm init -y && pnpm add express typescript @types/node @types/express  && pnpm add ts-node ',
        bun: 'npm init -y && bun install express typescript @types/node @types/express  && bun install ts-node ',
      },
    }
  },
  nestjs: {
    name: 'NestJS',
    type: 'backend',
    commands: {
      javascript:{
        npm: 'npm i -g @nestjs/cli && nest new . --language js --package-manager npm --skip-git',
        pnpm: 'npm i -g @nestjs/cli && nest new . --language js --package-manager pnpm --skip-git',
      },
      typescript: {
        npm: 'npm i -g @nestjs/cli && nest new . --language ts --package-manager npm --skip-git',
        pnpm: 'npm i -g @nestjs/cli && nest new . --language ts --package-manager pnpm --skip-git',
      }

     
    }
  },
  fastify: {
    name: 'Fastify',
    type: 'backend',
    commands: {
      javascript: {
        npm: 'npm init -y && npm i fastify',
        pnpm: 'npm init -y && pnpm add fastify',
        bun: 'npm init -y && bun add fastify',
      },
      typescript: {
        npm: 'npm init -y && npm i fastify && npm i -D typescript @types/node && npx tsc --init',
        pnpm: 'npm init -y && pnpm add fastify && npm i -D typescript @types/node && npx tsc --init',
        bun: 'npm init -y && bun add fastify && npm i -D typescript @types/node && npx tsc --init',
      },
    }
  }
};

// Install function
export async function installFramework(
  framework: FrontendFramework | BackendFramework,
  targetPath: string,
  language: Language,
  packageManager: PackageManager,
  buildTool?: BuildTool | 'cra'
): Promise<void> {
  const config = FRAMEWORKS[framework];
  if (!config) throw new FrameworkInstallationError(framework, { reason: 'Framework not supported' });

  let command: string | undefined;

  if (config.type === 'frontend') {
    const tool = buildTool ?? 'vite';
    command = (config.commands as FrontendCommandMap)[language]?.[packageManager]?.[tool];
    if (!command) {
      throw new FrameworkInstallationError(framework, {
        reason: `No command defined for ${language} + ${packageManager} + ${tool}`
      });
    }
  } else {
    command = (config.commands as BackendCommandMap)[language]?.[packageManager];
    if (!command) {
      throw new FrameworkInstallationError(framework, {
        reason: `No command defined for ${language} + ${packageManager}`
      });
    }
  }

  const [cmd, ...args] = command.split(' ');
  await new PackageManagerUtils(packageManager).executeCommand(targetPath, cmd, args);
}
export { FRAMEWORKS };
