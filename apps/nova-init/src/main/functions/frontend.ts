// src/functions/frontend.ts
import { select, text, isCancel, cancel } from '@clack/prompts';
import type { PackageManager } from '../../types/types.js';
import { askPackageManager } from '../../main/functions/packageManager.js';

// Liste der Frontend-Frameworks
const frontendFrameworks = [
  { value: 'react', label: 'React – JavaScript library for building UIs' },
  { value: 'next', label: 'Next.js – React framework for production' },
  { value: 'vue', label: 'Vue.js – Progressive JavaScript framework' },
  { value: 'svelte', label: 'Svelte – Cybernetically enhanced web apps' },
  { value: 'angular', label: 'Angular – Platform for mobile and desktop apps' },
  { value: 'nuxt', label: 'Nuxt.js – Vue.js framework for production' },
  { value: 'astro', label: 'Astro – Web framework for content websites' },
  { value: 'remix', label: 'Remix – Full-stack React framework' },
  { value: 'solid', label: 'Solid – JavaScript UI library' },
  { value: 'qwik', label: 'Qwik – Instant-loading web apps' },
  { value: 'preact', label: 'Preact – Fast 3kB alternative to React' },
  { value: 'lit', label: 'Lit – Simple and fast web components' },
];

export async function askFrontendLanguage(): Promise<'javascript' | 'typescript'> {
  const lang = await select({
    message: 'Select frontend language:',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
    ],
  });

  if (isCancel(lang)) {
    cancel('Frontend language selection cancelled.');
    process.exit(0);
  }

  return lang as 'javascript' | 'typescript';
}

export async function askFrontendFramework(): Promise<string> {
  const framework = await select({
    message: 'Select frontend framework:',
    options: frontendFrameworks,
  });

  if (isCancel(framework)) {
    cancel('Frontend framework selection cancelled.');
    process.exit(0);
  }

  return framework as string;
}

export async function askFrontendFolderName(): Promise<string> {
  const folder = await text({
    message: 'Frontend folder name:',
    placeholder: 'frontend',
  });

  if (isCancel(folder)) {
    cancel('Frontend folder naming cancelled.');
    process.exit(0);
  }

  return folder?.trim() || 'frontend';
}

export async function askFrontendPackageManager(): Promise<PackageManager> {
  return await askPackageManager('Select a package manager for the frontend:');
}
