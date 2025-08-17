import { select, isCancel, cancel } from '@clack/prompts';

export type PredefinedTechStack = 
  | 'MERN' 
  | 'MEAN' 
  | 'MEVN' 
  | 'MERN_TS' 
  | 'MEAN_TS' 
  | 'MEVN_TS'
  | 'FULL_STACK_TS'
  | 'MINIMAL_TS';

export async function askTechStack(): Promise<PredefinedTechStack> {
  const techStack = await select({
    message: 'Choose a predefined tech stack:',
    options: [
      { value: 'MERN', label: 'MERN Stack - MongoDB, Express, React, Node.js' },
      { value: 'MEAN', label: 'MEAN Stack - MongoDB, Express, Angular, Node.js' },
      { value: 'MEVN', label: 'MEVN Stack - MongoDB, Express, Vue.js, Node.js' },
      { value: 'MERN_TS', label: 'MERN Stack with TypeScript' },
      { value: 'MEAN_TS', label: 'MEAN Stack with TypeScript' },
      { value: 'MEVN_TS', label: 'MEVN Stack with TypeScript' },
      { value: 'FULL_STACK_TS', label: 'Full Stack TypeScript - Next.js, NestJS, PostgreSQL' },
      { value: 'MINIMAL_TS', label: 'Minimal TypeScript - Express, React' }
    ],
  });

  if (isCancel(techStack)) {
    cancel('Tech stack selection cancelled.');
    process.exit(0);
  }

  return techStack as PredefinedTechStack;
}

export function getTechStackConfig(techStack: PredefinedTechStack): {
  frontend: { language: string; framework: string; packageManager: string };
  backend: { language: string; framework: string; packageManager: string };
  database: string;
  monorepo: string;
} {
  const configs: Record<PredefinedTechStack, any> = {
    MERN: {
      frontend: { language: 'javascript', framework: 'react', packageManager: 'npm' },
      backend: { language: 'javascript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    },
    MEAN: {
      frontend: { language: 'javascript', framework: 'angular', packageManager: 'npm' },
      backend: { language: 'javascript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    },
    MEVN: {
      frontend: { language: 'javascript', framework: 'vue', packageManager: 'npm' },
      backend: { language: 'javascript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    },
    MERN_TS: {
      frontend: { language: 'typescript', framework: 'react', packageManager: 'npm' },
      backend: { language: 'typescript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    },
    MEAN_TS: {
      frontend: { language: 'typescript', framework: 'angular', packageManager: 'npm' },
      backend: { language: 'typescript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    },
    MEVN_TS: {
      frontend: { language: 'typescript', framework: 'vue', packageManager: 'npm' },
      backend: { language: 'typescript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    },
    FULL_STACK_TS: {
      frontend: { language: 'typescript', framework: 'nextjs', packageManager: 'pnpm' },
      backend: { language: 'typescript', framework: 'nestjs', packageManager: 'pnpm' },
      database: 'postgres',
      monorepo: 'turborepo'
    },
    MINIMAL_TS: {
      frontend: { language: 'typescript', framework: 'react', packageManager: 'npm' },
      backend: { language: 'typescript', framework: 'express', packageManager: 'npm' },
      database: 'mongodb',
      monorepo: 'none'
    }
  };

  return configs[techStack];
}

export function validateTechStack(techStack: string): PredefinedTechStack {
  const validStacks = [
    'MERN', 'MEAN', 'MEVN', 'MERN_TS', 'MEAN_TS', 'MEVN_TS', 
    'FULL_STACK_TS', 'MINIMAL_TS'
  ];
  
  if (!validStacks.includes(techStack)) {
    throw new Error(`Invalid tech stack. Must be one of: ${validStacks.join(', ')}`);
  }
  return techStack as PredefinedTechStack;
}
