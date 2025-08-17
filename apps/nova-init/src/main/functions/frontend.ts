// src/functions/frontend.ts
import { select, text, isCancel, cancel } from '@clack/prompts';
import type { Language, FrontendFramework, PackageManager, FrontendSetup } from '../../types/index.js';

export async function askFrontendLanguage(): Promise<Language> {
  const language = await select({
    message: 'Choose frontend coding language:',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' }
    ],
  });

  if (isCancel(language)) {
    cancel('Frontend language selection cancelled.');
    process.exit(0);
  }

  return language as Language;
}

export async function askFrontendFramework(language: Language): Promise<FrontendFramework> {
  const frameworks = await select({
    message: `Choose frontend framework for ${language}:`,
    options: [
      { value: 'react', label: 'React - A JavaScript library for building user interfaces' },
      { value: 'nextjs', label: 'Next.js - React framework with SSR and SSG' },
      { value: 'vue', label: 'Vue.js - Progressive JavaScript framework' },
      { value: 'nuxtjs', label: 'Nuxt.js - Vue framework with SSR and SSG' },
      { value: 'svelte', label: 'Svelte - Cybernetically enhanced web apps' },
      { value: 'angular', label: 'Angular - Platform for building mobile and desktop web applications' },
      { value: 'astro', label: 'Astro - Build faster websites with less client-side JavaScript' },
      { value: 'remix', label: 'Remix - Full stack web framework' },
      { value: 'solid', label: 'Solid - Declarative JavaScript UI library' },
      { value: 'qwik', label: 'Qwik - Instant-loading web apps' },
      { value: 'preact', label: 'Preact - Fast 3kB alternative to React' },
      { value: 'lit', label: 'Lit - Simple. Fast. Web Components.' }
    ],
  });

  if (isCancel(frameworks)) {
    cancel('Frontend framework selection cancelled.');
    process.exit(0);
  }

  return frameworks as FrontendFramework;
}

export async function askFrontendFolderName(): Promise<string> {
  const folderName = await text({
    message: 'Enter frontend folder name:',
    placeholder: 'frontend',
    defaultValue: 'frontend',
  });

  if (isCancel(folderName)) {
    cancel('Frontend folder name input cancelled.');
    process.exit(0);
  }

  return folderName?.trim() || 'frontend';
}

export async function askFrontendPackageManager(): Promise<PackageManager> {
  const packageManager = await select({
    message: 'Choose frontend package manager:',
    options: [
      { value: 'npm', label: 'npm - Node Package Manager' },
      { value: 'pnpm', label: 'pnpm - Fast, disk space efficient package manager' },
      { value: 'bun', label: 'Bun - All-in-one JavaScript runtime & package manager' }
    ],
  });

  if (isCancel(packageManager)) {
    cancel('Frontend package manager selection cancelled.');
    process.exit(0);
  }

  return packageManager as PackageManager;
}

export async function askFrontendSetup(hasMonorepo: boolean): Promise<FrontendSetup> {
  const language = await askFrontendLanguage();
  const framework = await askFrontendFramework(language);
  const folderName = await askFrontendFolderName();
  const packageManager = await askFrontendPackageManager();

  return {
    language,
    framework,
    folderName,
    packageManager,
  };
}

export function validateFrontendLanguage(language: string): Language {
  if (!['javascript', 'typescript'].includes(language)) {
    throw new Error('Invalid frontend language. Must be "javascript" or "typescript"');
  }
  return language as Language;
}

export function validateFrontendFramework(framework: string): FrontendFramework {
  const validFrameworks = [
    'react', 'nextjs', 'vue', 'nuxtjs', 'svelte', 'angular', 
    'astro', 'remix', 'solid', 'qwik', 'preact', 'lit'
  ];
  
  if (!validFrameworks.includes(framework)) {
    throw new Error(`Invalid frontend framework. Must be one of: ${validFrameworks.join(', ')}`);
  }
  return framework as FrontendFramework;
}

export function validateFrontendPackageManager(packageManager: string): PackageManager {
  if (!['npm', 'pnpm', 'bun'].includes(packageManager)) {
    throw new Error('Invalid frontend package manager. Must be "npm", "pnpm", or "bun"');
  }
  return packageManager as PackageManager;
}
