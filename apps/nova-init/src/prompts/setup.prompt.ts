import { confirm, text, isCancel, cancel} from '@clack/prompts';

import { promptLanguage } from './prompts/language.js';
import { promptFrontend } from './prompts/frontend.js';
import { promptBackend } from './prompts/backend.js';
import { promptDatabase } from './prompts/database.js';
import { promptMonorepo } from './prompts/monorepo.js';
import { promptMicroservice } from './prompts/microservice.js';
import { promptDocker } from './prompts/docker.js';
import { promptGit } from './prompts/git.js';
import { promptPackageManager } from './prompts/packageManager.js';
import { promptTechstack } from './prompts/techstack.js'; // angenommen du hast diese Datei

import type { ProjectStructure, MonorepoTool, Techstack } from '../types/types.js';

export async function promptSetup(): Promise<ProjectStructure> {

  const useTechstack = await confirm({
    message: 'Do you want to use a predefined techstack?'
  });

  if (useTechstack) {
 
    const techstack = await promptTechstack();

    
    const language = 'ts';
    const frontend = 'react';
    const backend = 'express';
    const database = 'mongodb';
    const monorepo: MonorepoTool = 'none';
    const microservice = { enabled: false };
    const docker = { enabled: false };
    const git = { init: false };
    const packageManager = 'npm';

    const useCustomPaths = await confirm({
      message: 'Customize folder names?'
    });

    let paths;
    if (useCustomPaths) {
      paths = await promptPaths();
    } else {
      paths = {
        root: 'my-project',
        frontend: 'frontend',
        backend: 'backend',
        database: 'database',
        docker: 'docker',
      };
    }

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
      packageManager,
      paths,
    };
  } else {
   
    const language = await promptLanguage();
    const packageManager = await promptPackageManager();
    const monorepo = await promptMonorepo();
    const frontend = await promptFrontend();
    const backend = await promptBackend();
    const microservice = await promptMicroservice();
    const database = await promptDatabase();
    const docker = await promptDocker();
    const git = await promptGit();
    const techstack: Techstack = 'none';


    const useCustomPaths = await confirm({
      message: 'Customize folder names?'
    });

    let paths;
    if (useCustomPaths) {
      paths = await promptPaths();
    } else {
      paths = {
        root: 'my-project',
        frontend: 'frontend',
        backend: 'backend',
        database: 'database',
        docker: 'docker',
      };
    }

    return {
      language,
      frontend,
      backend,
      database,
      monorepo,
      microservice,
      docker,
      git,
      packageManager,
      paths,
      techstack,
    };
  }
}

async function promptPaths() {
  const root = await text({
    message: 'Root project folder name:',
    placeholder: 'my-project',
  });

  if (isCancel(root)) {
    cancel('Abbruch beim Root-Verzeichnis');
    process.exit(0);
  }

  const frontend = await text({
    message: 'Frontend folder name:',
    placeholder: 'frontend',
  });
  if (isCancel(frontend)) {
    cancel('Abbruch beim Frontend-Verzeichnis');
    process.exit(0);
  }

  const backend = await text({
    message: 'Backend folder name:',
    placeholder: 'backend',
  });
  if (isCancel(backend)) {
    cancel('Abbruch beim Backend-Verzeichnis');
    process.exit(0);
  }

  const database = await text({
    message: 'Database folder name:',
    placeholder: 'database',
  });
  if (isCancel(database)) {
    cancel('Abbruch beim Database-Verzeichnis');
    process.exit(0);
  }

  const docker = await text({
    message: 'Docker folder name:',
    placeholder: 'docker',
  });
  if (isCancel(docker)) {
    cancel('Abbruch beim Docker-Verzeichnis');
    process.exit(0);
  }

  return {
    root: root,
    frontend: frontend,
    backend: backend,
    database: database,
    docker: docker,
  };
}