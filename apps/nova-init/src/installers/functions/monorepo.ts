import * as path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import { getPMCommands } from '../functions/packageManager.js';
import type { ProjectStructure, MonorepoTool, PackageManager } from '../../types/types.js';

function parseExecCommand(command: string, args: string[] = []): [string, string[]] {
  const parts = command.split(' ');
  const binary = parts[0];
  const initialArgs = parts.slice(1);
  return [binary, [...initialArgs, ...args]];
}

export async function generateMonorepo(config: ProjectStructure): Promise<void> {
  const { monorepo, packageManagers, paths } = config;
  const pm: PackageManager = packageManagers.monorepo;
  const pmCmd = getPMCommands(pm);
  let root = paths.root;

  const commands: Record<MonorepoTool, () => Promise<void>> = {
    lerna: async () => {
      if (pm === 'bun') {
        console.error(chalk.red(`❌ Bun is not supported for Lerna. Please use npm or pnpm.`));
        process.exit(1);
      }

      console.log(chalk.green(`📦 Installing Lerna in "${root}" with ${pm}...`));
      const [bin, args] = parseExecCommand(pmCmd.exec('lerna'), ['init']);
      await execa(bin, args, {
        cwd: root,
        stdio: 'inherit',
      });
    },

    nx: async () => {
      console.log(chalk.green(`📦 Installing Nx in "${root}" with ${pm}...`));
      const parent = path.dirname(root);
      const projectName = path.basename(root);
      const [bin, args] = parseExecCommand(pmCmd.exec('create-nx-workspace@latest'), [
        projectName,
        '--preset=empty',
        '--nxCloud=false',
      ]);

      await execa(bin, args, {
        cwd: parent,
        stdio: 'inherit',
      });

      config.paths.root = path.join(parent, projectName);
    },

    turborepo: async () => {
      if (!['npm', 'pnpm', 'bun'].includes(pm)) {
        console.error(chalk.red(`❌ Unsupported package manager "${pm}" for Turborepo.`));
        process.exit(1);
      }

      console.log(chalk.green(`📦 Installing Turborepo in "${root}" with ${pm}...`));
      const [bin, args] = parseExecCommand(pmCmd.exec('create-turbo@latest'), ['.', '-m', pm]);

      await execa(bin, args, {
        cwd: root,
        stdio: 'inherit',
      });
    },

    none: async () => {
      console.log(chalk.yellow('⚠️ No monorepo selected.'));
    },
  };

  const installer = commands[monorepo];

  if (!installer) {
    console.error(chalk.red(`❌ Unknown monorepo tool: "${monorepo}"`));
    process.exit(1);
  }

  await installer();

  // Optional: pnpm workspace file
  if (pm === 'pnpm' && getPMCommands(pm).setupWorkspace) {
    await getPMCommands(pm).setupWorkspace!(config.paths.root, ['apps', 'packages']);
  }
}
