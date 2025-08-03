import * as path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import { ProjectStructure } from '../../types/types.js';

// Lerna Installation
async function installLerna(rootFolder: string) {
  console.log(chalk.green(`\nInstalling Lerna (Monorepo) in "${rootFolder}"...`));
  await execa('npx', ['lerna', 'init'], {
    cwd: rootFolder,
    stdio: 'inherit',
  });
}

// Nx Installation
async function installNx(parentFolder: string, projectName: string) {
  console.log(chalk.green(`\nInstalling Nx workspace "${projectName}" in "${parentFolder}"...`));
  await execa('npx', ['create-nx-workspace@latest', projectName, '--preset=empty', '--nxCloud=false'], {
    cwd: parentFolder,
    stdio: 'inherit',
  });
}

// Turborepo Installation
async function installTurbo(rootFolder: string) {
  console.log(chalk.green(`\nInstalling Turborepo (Monorepo) in "${rootFolder}"...`));
  await execa('npx', ['create-turbo@latest', '.'], {
    cwd: rootFolder,
    stdio: 'inherit'
  });
}

// Generate selected Monorepo
export async function generateMonorepo(config: ProjectStructure): Promise<void> {
  const { monorepo } = config;
  let { root } = config.paths;

  switch (monorepo) {
    case 'lerna':
      await installLerna(root);
      break;

    case 'nx': {
      const parentFolder = path.dirname(root);
      const projectName = path.basename(root);
      await installNx(parentFolder, projectName);
      root = path.join(parentFolder, projectName);
      break;
    }

    case 'turborepo':
      await installTurbo(root);
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
