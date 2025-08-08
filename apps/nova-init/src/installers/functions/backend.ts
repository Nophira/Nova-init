// src/functions/backend.ts
import { select, text, isCancel, cancel } from '@clack/prompts';
import type { PackageManager } from '../../types/types.js';
import { askPackageManager } from './packageManager.js';

// Liste der Backend-Frameworks
const backendFrameworks = [
  { value: 'express', label: 'Express.js – Minimalist Node.js framework' },
  { value: 'nestjs', label: 'NestJS – Enterprise-ready Node.js framework' },
  { value: 'fastify', label: 'Fastify – Fast and efficient Node.js framework' },
];

export async function askBackendLanguage(): Promise<'javascript' | 'typescript'> {
  const lang = await select({
    message: 'Select backend language:',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
    ],
  });

  if (isCancel(lang)) {
    cancel('Backend language selection cancelled.');
    process.exit(0);
  }

  return lang as 'javascript' | 'typescript';
}

export async function askBackendFramework(): Promise<string> {
  const framework = await select({
    message: 'Select backend framework:',
    options: backendFrameworks,
  });

  if (isCancel(framework)) {
    cancel('Backend framework selection cancelled.');
    process.exit(0);
  }

  return framework as string;
}

export async function askBackendFolderName(): Promise<string> {
  const folder = await text({
    message: 'Backend folder name:',
    placeholder: 'backend',
  });

  if (isCancel(folder)) {
    cancel('Backend folder naming cancelled.');
    process.exit(0);
  }

  return folder?.trim() || 'backend';
}

export async function askBackendPackageManager(): Promise<PackageManager> {
  return await askPackageManager('Select a package manager for the backend:');
}
