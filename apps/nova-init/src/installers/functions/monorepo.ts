// src/installers/functions/monorepo.ts

import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { ProjectStructure } from '../../types/types.js';

// Lerna Installation
function installLerna(rootFolder: string) {
  console.log(chalk.green(`\nInstalling Lerna (Monorepo) in "${rootFolder}"...`));
  execSync(`npx lerna init`, {
    cwd: rootFolder,
    stdio: 'inherit',
  });
}

// Nx Installation
function installNx(parentFolder: string, projectName: string) {
  console.log(chalk.green(`\nInstalling Nx workspace "${projectName}" in "${parentFolder}"...`));
  execSync(`npx create-nx-workspace@latest ${projectName} --preset=empty --nxCloud=false`, {
    cwd: parentFolder,
    stdio: 'inherit',
  });
}

// Turborepo Installation
function installTurbo(rootFolder: string) {
  console.log(chalk.green(`\nInstalling Turborepo (Monorepo) in "${rootFolder}"...`));
  execSync(`npx create-turbo@latest .`, {
    cwd: rootFolder,
    stdio: 'inherit',
  });
}

// Generate selected Monorepo
export async function generateMonorepo(config: ProjectStructure): Promise<void> {
  const { monorepo } = config;
  let { root } = config.paths;

  switch (monorepo) {
    case 'lerna':
      installLerna(root);
      break;

    case 'nx': {
      const parentFolder = path.dirname(root);
      const projectName = path.basename(root);
      installNx(parentFolder, projectName);
      root = path.join(parentFolder, projectName);
      break;
    }

    case 'turborepo':
      installTurbo(root);
      break;

    case 'none':
      console.log(chalk.yellow('No monorepo selected, skipping monorepo setup.'));
      return;

    default:
      console.warn(chalk.red(`Unknown monorepo tool: "${monorepo}"`));
      return;
  }

  // Update the root path in case it changed (e.g., for Nx)
  config.paths.root = root;
}
