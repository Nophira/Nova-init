import * as path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import { getPMCommands } from '../functions/packageManager.js';
import type { ProjectStructure, MonorepoTool } from '../../types/types.js';

export async function generateMonorepo(config: ProjectStructure): Promise<void> {
  const { monorepo, packageManagers, paths } = config;
  const pm = packageManagers.monorepo;
  const pmCmd = getPMCommands(pm);
  let root = paths.root;

  const commands: Record<MonorepoTool, () => Promise<void>> = {
    lerna: async () => {
      console.log(chalk.green(`Installing Lerna in "${root}" with ${pm}...`));
      await execa('sh', ['-c', pmCmd.exec('lerna init')], {
        cwd: root,
        stdio: 'inherit',
      });
    },

    nx: async () => {
      const parent = path.dirname(root);
      const projectName = path.basename(root);
      console.log(chalk.green(`Installing Nx in "${parent}" with ${pm}...`));
      await execa('sh', ['-c', `${pmCmd.exec('create-nx-workspace@latest')} ${projectName} --preset=empty --nxCloud=false`], {
        cwd: parent,
        stdio: 'inherit',
      });
      config.paths.root = path.join(parent, projectName);
    },

    turborepo: async () => {
      console.log(chalk.green(`Installing Turborepo in "${root}" with ${pm}...`));
      await execa('sh', ['-c', `${pmCmd.exec('create-turbo@latest')} .`], {
        cwd: root,
        stdio: 'inherit',
      });
    },

    none: async () => {
      console.log(chalk.yellow('No monorepo selected.'));
    }
  };

  const installer = commands[monorepo];
  if (!installer) {
    console.error(chalk.red(`❌ Unknown monorepo tool: "${monorepo}"`));
    process.exit(1);
  }

  await installer();

}
