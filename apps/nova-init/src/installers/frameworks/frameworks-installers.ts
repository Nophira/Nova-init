import path from 'path';
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
        npm: { vite: 'npm create vite@latest . -- --template react-ts' },
        pnpm: { vite: 'pnpm create vite . --template react-ts' },
        bun: { vite: 'bun create vite . --template react-ts' },
      },
      javascript: {
        npm: { vite: 'npm create vite@latest . -- --template react' },
        pnpm: { vite: 'pnpm create vite . --template react' },
        bun: { vite: 'bun create vite . --template react' },
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
        pnpm: { vite: 'pnpm create vite@latest . --template vue' },
        bun: { vite: 'bun create vite . --template vue' },
      },
      typescript: {
        npm: { vite: 'npm create vite@latest . -- --template vue-ts' },
        pnpm: { vite: 'pnpm create vite@latest . --template vue-ts' },
        bun: { vite: 'bun create vite . --template vue-ts' },
      },
    }
  },
  angular: {
    name: 'Angular',
    type: 'frontend',
    commands: {
      typescript: {
        npm: 'npx @angular/cli new my-app --directory . --skip-install --package-manager=npm --defaults',
        pnpm: 'npx @angular/cli new my-app --directory . --skip-install --package-manager=pnpm --defaults',
        bun: 'npx @angular/cli new my-app --directory . --skip-install --package-manager=bun --defaults',
      }
    }
  },
  astro: {
    name: 'Astro',
    type: 'frontend',
    commands: {
      typescript: {
        npm: 'npm create astro@latest . -- --template basics',
        pnpm: 'pnpm create astro@latest . -- --template basics',
      }
    }
  },

  lit:{
    name: 'Lit',
    type: 'frontend',
    supportsVite: true,
    commands: {
      typescript: {
        npm: { vite: 'npm create vite@latest . -- --template lit-ts' },
        pnpm: { vite: 'pnpm create vite . --template lit-ts' },
        bun: { vite: 'bun create vite . --template lit-ts' },
      },
      javascript: {
        npm: { vite: 'npm create vite@latest . -- --template lit' },
        pnpm: { vite: 'pnpm create vite . --template lit' },
        bun: { vite: 'bun create vite . --template lit' },
      },
    }
  },

 nextjs: {
  name: 'Next.js',
  type: 'frontend',
  supportsVite: false,
  commands: {
    javascript: {
      npm: { standard: 'npx create-next-app@latest . --js --use-npm' },
      pnpm: { standard: 'pnpm create next-app@latest . --js --use-pnpm' },
      bun: { standard: 'bun create next-app@latest . --js --use-bun' },
    },
    typescript: {
      npm: { standard: 'npx create-next-app@latest . --ts --use-npm' },
      pnpm: { standard: 'pnpm create next-app@latest . --ts --use-pnpm' },
      bun: { standard: 'bun create next-app@latest . --ts --use-bun' },
    }
  }
},

nuxtjs:{
  name: 'Nuxt.js',
  type: 'frontend',
  supportsVite: false,
  commands: {
    typescript: {
      npm: {standard:'npx nuxi@latest init . --template --packageManager npm -f --no-install'},
      pnpm:{standard:'npx nuxi@latest init . --template --packageManager pnpm -f --no-install'},
      bun: {standard:'bunx nuxi@latest init . --template --packageManager bun -f --no-install'},
    }
  }
},

preact:{
    name: 'Preact',
    type: 'frontend',
    supportsVite: true,
    commands: {
      typescript: {
        npm: { vite: 'npm create vite@latest . -- --template preact-ts' },
        pnpm: { vite: 'pnpm create vite . --template preact-ts' },
        bun: { vite: 'bun create vite . --template preact-ts' },
      },
      javascript: {
        npm: { vite: 'npm create vite@latest . -- --template preact' },
        pnpm: { vite: 'pnpm create vite . --template preact' },
        bun: { vite: 'bun create vite . --template preact' },
      },
    }
},
qwik:{
    name: 'Qwik',
    type: 'frontend',
    supportsVite: true,
    commands: {
      typescript: {
        npm: { vite: 'npm create vite@latest . -- --template qwik-ts' },
        pnpm: { vite: 'pnpm create vite . --template qwik-ts' },
        bun: { vite: 'bun create vite . --template qwik-ts' },
      },
      javascript: {
        npm: { vite: 'npm create vite@latest . -- --template qwik' },
        pnpm: { vite: 'pnpm create vite . --template qwik' },
        bun: { vite: 'bun create vite . --template qwik' },
      },
    }
},
/*
remix:{
    name: 'Remix',
    type: 'frontend',
    supportsVite: false,
    commands: {
      typescript: {
        npm: { standard: 'npx create-remix@latest . --typescript --install --no-git' },
        pnpm: { standard: 'npx create-remix@latest . --typescript --install --no-git' },
        bun: { standard: 'bun create remix . --typescript --install --no-git' },
      },
      javascript: {
        npm: { standard: 'npx create-remix@latest . --javascript --install --no-git' },
        pnpm: { standard: 'npx create-remix@latest . --javascript --install --no-git' },
        bun: { standard: 'bun create remix . --javascript --install --no-git' },
      },
    }
},
*/
solid:{
  name: 'Solid',
  type: 'frontend',
  supportsVite: true,
  commands: {
    typescript: {
      npm: { vite: 'npm create vite@latest . -- --template solid-ts' },
      pnpm: { vite: 'pnpm create vite . --template solid-ts' },
      bun: { vite: 'bun create vite . --template solid-ts' },
    },
    javascript: {
      npm: { vite: 'npm create vite@latest . -- --template solid' },
      pnpm: { vite: 'pnpm create vite . --template solid' },
      bun: { vite: 'bun create vite . --template solid' },
    },
  }
},

svelte: {
    name: 'Svelte',
    type: 'frontend',
    supportsVite: true,
    commands: {
      typescript: {
        npm: { vite: 'npm create vite@latest . -- --template svelte-ts' },
        pnpm: { vite: 'pnpm create vite . --template svelte-ts' },
        bun: { vite: 'bun create vite . --template svelte-ts' },
      },
      javascript: {
        npm: { vite: 'npm create vite@latest . -- --template svelte' },
        pnpm: { vite: 'pnpm create vite . --template svelte' },
        bun: { vite: 'bun create vite . --template svelte' },
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
        npm: 'npm init -y && npm install express typescript @types/node @types/express && npm install ts-node',
        pnpm: 'npm init -y && pnpm add express typescript @types/node @types/express && pnpm add ts-node',
        bun: 'npm init -y && bun install express typescript @types/node @types/express && bun install ts-node',
      },
    }
  },
  nestjs: {
    name: 'NestJS',
    type: 'backend',
    commands: {
      javascript: {
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
  },
  hono:{
    name: 'Hono',
    type: 'backend',
    commands: {
      typescript: {
        npm: 'npm create hono@latest .',
        pnpm: 'pnpm create hono@latest . ',
        bun: 'bun create hono@latest . ',
      }
    }

  },
};

// Install function
export async function installFramework(
  framework: FrontendFramework | BackendFramework,
  targetPath: string,
  language: Language,
  packageManager: PackageManager,
  buildTool?: BuildTool | 'standard'
): Promise<void> {
  const config = FRAMEWORKS[framework];
  if (!config) throw new FrameworkInstallationError(framework, { reason: 'Framework not supported' });

  let command: string | undefined;

  if (config.type === 'frontend') {
    // 🌟 Spezialfälle Angular & Astro
    if (framework === 'angular' || framework === 'astro') {
      const projectName = path.basename(targetPath);
      const rawCmd = (config.commands as any)[language]?.[packageManager];
      if (!rawCmd) {
        throw new FrameworkInstallationError(framework, {
          reason: `No ${framework} command defined for ${language} + ${packageManager}`
        });
      }
      // Platzhalter in Angular ersetzen
      command = rawCmd.replace('my-app', projectName);
    } else {
      const tool = buildTool ?? 'vite';
      command = (config.commands as FrontendCommandMap)[language]?.[packageManager]?.[tool];
      if (!command) {
        throw new FrameworkInstallationError(framework, {
          reason: `No command defined for ${language} + ${packageManager} + ${tool}`
        });
      }
    }
  } else {
    command = (config.commands as BackendCommandMap)[language]?.[packageManager];
    if (!command) {
      throw new FrameworkInstallationError(framework, {
        reason: `No command defined for ${language} + ${packageManager}`
      });
    }
  }

  if (!command) {
    throw new FrameworkInstallationError(framework, { reason: 'Command is undefined' });
  }
  const [cmd, ...args] = command.split(' ');
  await new PackageManagerUtils(packageManager).executeCommand(targetPath, cmd, args);
}

export { FRAMEWORKS };
