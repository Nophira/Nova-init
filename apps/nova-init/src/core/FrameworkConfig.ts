
import type { FrontendFramework, BackendFramework, Language, PackageManager } from '../types/index.js';

export interface FrameworkConfig {
  name: string;
  supportedLanguages: Language[];
  supportedPackageManagers: PackageManager[];
  supportsVite: boolean;
  defaultLanguage: Language;
  defaultPort: number;
  installCommand: {
    withVite?: string;
    withoutVite?: string;
    default: string;
  };
  createCommands: {
    typescript: string;
    javascript: string;
  };
  devDependencies?: {
    typescript: string[];
    javascript: string[];
  };
  dependencies?: {
    common: string[];
  };
  scripts: {
    dev: string;
    build: string;
    start: string;
    preview?: string;
  };
}

export const FRONTEND_CONFIGS: Record<FrontendFramework, FrameworkConfig> = {
  react: {
    name: 'React',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      withVite: 'npm create vite@latest',
      withoutVite: 'npx create-react-app',
      default: 'npm create vite@latest',
    },
    createCommands: {
      typescript: 'npm create vite@latest . --template react-ts',
      javascript: 'npm create vite@latest . --template react',
    },
    scripts: {
      dev: 'vite',
      build: 'vite build',
      start: 'vite preview',
      preview: 'vite preview',
    },
  },

  nextjs: {
    name: 'Next.js',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: false,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npx create-next-app@latest',
    },
    createCommands: {
      typescript: 'npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"',
      javascript: 'npx create-next-app@latest . --tailwind --app --src-dir --import-alias "@/*"',
    },
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
  },

  vue: {
    name: 'Vue.js',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npm create vue@latest',
    },
    createCommands: {
      typescript: 'npm create vue@latest . -- --typescript --jsx --router --pinia --vitest --eslint --prettier',
      javascript: 'npm create vue@latest . -- --jsx --router --pinia --vitest --eslint --prettier',
    },
    scripts: {
      dev: 'vite',
      build: 'vite build',
      start: 'vite preview',
      preview: 'vite preview',
    },
  },

  svelte: {
    name: 'Svelte',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 5173,
    installCommand: {
      default: 'npm create svelte@latest',
    },
    createCommands: {
      typescript: 'npm create svelte@latest . -- --template skeleton --types typescript --prettier --eslint',
      javascript: 'npm create svelte@latest . -- --template skeleton --prettier --eslint',
    },
    scripts: {
      dev: 'vite dev',
      build: 'vite build',
      start: 'vite preview',
      preview: 'vite preview',
    },
  },

  angular: {
    name: 'Angular',
    supportedLanguages: ['typescript'],
    supportedPackageManagers: ['npm', 'pnpm'],
    supportsVite: false,
    defaultLanguage: 'typescript',
    defaultPort: 4200,
    installCommand: {
      default: 'npx @angular/cli@latest new',
    },
    createCommands: {
      typescript: 'npx @angular/cli@latest new . --routing --style css --package-manager npm',
      javascript: 'npx @angular/cli@latest new . --routing --style css --package-manager npm', // Angular is TS-first
    },
    scripts: {
      dev: 'ng serve',
      build: 'ng build',
      start: 'ng serve',
    },
  },

  nuxtjs: {
    name: 'Nuxt.js',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npx nuxi@latest init',
    },
    createCommands: {
      typescript: 'npx nuxi@latest init .',
      javascript: 'npx nuxi@latest init .',
    },
    scripts: {
      dev: 'nuxt dev',
      build: 'nuxt build',
      start: 'nuxt preview',
      preview: 'nuxt preview',
    },
  },

  astro: {
    name: 'Astro',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npm create astro@latest',
    },
    createCommands: {
      typescript: 'npm create astro@latest . --template minimal --typescript strict --yes',
      javascript: 'npm create astro@latest . --template minimal --yes',
    },
    scripts: {
      dev: 'astro dev',
      build: 'astro build',
      start: 'astro preview',
      preview: 'astro preview',
    },
  },

  remix: {
    name: 'Remix',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npx create-remix@latest',
    },
    createCommands: {
      typescript: 'npx create-remix@latest . --template remix-run/remix/templates/remix --yes',
      javascript: 'npx create-remix@latest . --template remix-run/remix/templates/remix-js --yes',
    },
    scripts: {
      dev: 'remix vite:dev',
      build: 'remix vite:build',
      start: 'remix-serve build/server/index.js',
    },
  },

  solid: {
    name: 'Solid.js',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npx degit solidjs/templates',
    },
    createCommands: {
      typescript: 'npx degit solidjs/templates/ts .',
      javascript: 'npx degit solidjs/templates/js .',
    },
    scripts: {
      dev: 'vite',
      build: 'vite build',
      start: 'vite preview',
    },
  },

  qwik: {
    name: 'Qwik',
    supportedLanguages: ['typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 5173,
    installCommand: {
      default: 'npm create qwik@latest',
    },
    createCommands: {
      typescript: 'npm create qwik@latest . --yes',
      javascript: 'npm create qwik@latest . --yes', // Qwik is TS-first
    },
    scripts: {
      dev: 'vite dev',
      build: 'qwik build',
      start: 'vite preview',
      preview: 'vite preview',
    },
  },

  preact: {
    name: 'Preact',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npm create preact@latest',
    },
    createCommands: {
      typescript: 'npm create preact@latest . --template typescript --yes',
      javascript: 'npm create preact@latest . --template default --yes',
    },
    scripts: {
      dev: 'vite',
      build: 'vite build',
      start: 'vite preview',
    },
  },

  lit: {
    name: 'Lit',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    supportsVite: true,
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    installCommand: {
      default: 'npm create @lit/lit@latest',
    },
    createCommands: {
      typescript: 'npm create @lit/lit@latest . --template typescript --yes',
      javascript: 'npm create @lit/lit@latest . --template javascript --yes',
    },
    scripts: {
      dev: 'vite',
      build: 'vite build',
      start: 'vite preview',
    },
  },
};

export interface BackendFrameworkConfig {
  name: string;
  supportedLanguages: Language[];
  supportedPackageManagers: PackageManager[];
  defaultLanguage: Language;
  defaultPort: number;
  dependencies: {
    common: string[];
    typescript?: string[];
    javascript?: string[];
  };
  devDependencies: {
    common: string[];
    typescript?: string[];
    javascript?: string[];
  };
  scripts: {
    dev: string;
    build: string;
    start: string;
  };
  createCommands?: {
    typescript: string;
    javascript: string;
  };
  requiresManualSetup: boolean;
}

export const BACKEND_CONFIGS: Record<BackendFramework, BackendFrameworkConfig> = {
  express: {
    name: 'Express.js',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    defaultLanguage: 'typescript',
    defaultPort: 5000,
    dependencies: {
      common: ['express', 'cors', 'helmet', 'dotenv'],
    },
    devDependencies: {
      common: ['nodemon'],
      typescript: ['typescript', '@types/express', '@types/node', '@types/cors', 'ts-node-dev', 'tsconfig-paths'],
      javascript: [],
    },
    scripts: {
      dev: 'ts-node-dev --respawn --transpile-only src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js',
    },
    requiresManualSetup: true,
  },

  nestjs: {
    name: 'NestJS',
    supportedLanguages: ['typescript'],
    supportedPackageManagers: ['npm', 'pnpm'],
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    dependencies: {
      common: [],
    },
    devDependencies: {
      common: [],
    },
    createCommands: {
      typescript: 'npx @nestjs/cli@latest new . --package-manager',
      javascript: 'npx @nestjs/cli@latest new . --package-manager', // NestJS is TS-first
    },
    scripts: {
      dev: 'nest start --watch',
      build: 'nest build',
      start: 'node dist/main',
    },
    requiresManualSetup: false,
  },

  fastify: {
    name: 'Fastify',
    supportedLanguages: ['javascript', 'typescript'],
    supportedPackageManagers: ['npm', 'pnpm', 'bun'],
    defaultLanguage: 'typescript',
    defaultPort: 3000,
    dependencies: {
      common: ['fastify', '@fastify/cors', '@fastify/helmet', '@fastify/env'],
    },
    devDependencies: {
      common: ['nodemon'],
      typescript: ['typescript', '@types/node', 'ts-node-dev', 'tsconfig-paths'],
      javascript: [],
    },
    scripts: {
      dev: 'ts-node-dev --respawn --transpile-only src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js',
    },
    requiresManualSetup: true,
  },
};

// Helper functions
export function getFrameworkConfig(framework: FrontendFramework): FrameworkConfig {
  return FRONTEND_CONFIGS[framework];
}

export function getBackendConfig(framework: BackendFramework): BackendFrameworkConfig {
  return BACKEND_CONFIGS[framework];
}

export function isLanguageSupported(framework: FrontendFramework, language: Language): boolean {
  return FRONTEND_CONFIGS[framework].supportedLanguages.includes(language);
}

export function isPackageManagerSupported(framework: FrontendFramework, pm: PackageManager): boolean {
  return FRONTEND_CONFIGS[framework].supportedPackageManagers.includes(pm);
}

export function isViteSupported(framework: FrontendFramework): boolean {
  return FRONTEND_CONFIGS[framework].supportsVite;
}

export function getDefaultLanguage(framework: FrontendFramework): Language {
  return FRONTEND_CONFIGS[framework].defaultLanguage;
}
