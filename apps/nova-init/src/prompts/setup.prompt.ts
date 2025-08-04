// src/prompts/setup.prompt.ts

import { confirm, text, isCancel, cancel } from '@clack/prompts';

import { promptLanguage } from './prompts/language.js';
import { promptFrontend } from './prompts/frontend.js';
import { promptBackend } from './prompts/backend.js';
import { promptDatabase } from './prompts/database.js';
import { promptMonorepo } from './prompts/monorepo.js';
import { promptMicroservice } from './prompts/microservice.js';
import { promptDocker } from './prompts/docker.js';
import { promptGit } from './prompts/git.js';
import { promptPackageManager } from './prompts/packageManager.js';
import { promptTechstack } from './prompts/techstack.js';

import type {
  ProjectStructure,
  MonorepoTool,
  Techstack,
  PackageManager,
} from '../types/types.js';

export async function promptSetup(): Promise<ProjectStructure> {
  const useTechstack = await confirm({
    message: 'Do you want to use a predefined techstack?'
  });

  if (useTechstack) {
    const techstack = await promptTechstack();

    const language: 'ts' = 'ts';
    const frontend = 'react';
    const backend = 'express';
    const database = 'mongodb';
    const monorepo: MonorepoTool = 'none';
    const microservice = { enabled: false };
    const docker = { enabled: false };
    const git = { init: false };

    const packageManagers: {
      monorepo: PackageManager;
      frontend: PackageManager;
      backend: PackageManager;
    } = {
      monorepo: 'npm',
      frontend: 'npm',
      backend: 'npm',
    };

    const useCustomPaths = await confirm({
      message: 'Customize folder names?'
    });

    const paths = useCustomPaths ? await promptPaths() : defaultPaths();

    return {
      language,
      frontend,
      backend,
      database,
      monorepo,
      techstack,
      microservice,
      docker,
      git,
      packageManagers,
      paths
    };
  } else {
    const language = await promptLanguage();
    const monorepo = await promptMonorepo();
    const frontend = await promptFrontend();
    const backend = await promptBackend();
    const microservice = await promptMicroservice();
    const database = await promptDatabase();
    const docker = await promptDocker();
    const git = await promptGit();
    const techstack: Techstack = 'none';

    const packageManagers: {
      monorepo: PackageManager;
      frontend: PackageManager;
      backend: PackageManager;
    } = {
      monorepo: await promptPackageManager('Select a package manager for the monorepo:'),
      frontend: await promptPackageManager('Select a package manager for the frontend:'),
      backend: await promptPackageManager('Select a package manager for the backend:'),
    };

    const useCustomPaths = await confirm({
      message: 'Customize folder names?'
    });

    const paths = useCustomPaths ? await promptPaths() : defaultPaths();

    return {
      language,
      frontend,
      backend,
      database,
      monorepo,
      microservice,
      docker,
      git,
      techstack,
      packageManagers,
      paths
    };
  }
}

function defaultPaths() {
  return {
    root: 'my-project',
    frontend: 'frontend',
    backend: 'backend',
    database: 'database',
    docker: 'docker',
  };
}

async function promptPaths() {
  const root = await promptText('Root project folder name:', 'my-project');
  const frontend = await promptText('Frontend folder name:', 'frontend');
  const backend = await promptText('Backend folder name:', 'backend');
  const database = await promptText('Database folder name:', 'database');
  const docker = await promptText('Docker folder name:', 'docker');

  return { root, frontend, backend, database, docker };
}

async function promptText(message: string, placeholder: string) {
  const result = await text({ message, placeholder });

  if (isCancel(result)) {
    cancel(`Cancelled on: ${message}`);
    process.exit(0);
  }

  return result;
}
