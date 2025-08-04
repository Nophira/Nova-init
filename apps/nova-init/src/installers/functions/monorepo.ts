import * as path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import { getPMCommands } from '../functions/packageManager.js';
import type { ProjectStructure, MonorepoTool } from '../../types/types.js';

function parseExecCommand(command: string, args: string[] = []): [string, string[]] {
  const parts = command.split(' ');
  const binary = parts[0];
  const initialArgs = parts.slice(1);
  return [binary, [...initialArgs, ...args]];
}

export async function generateMonorepo(config: ProjectStructure): Promise<void> {
  const { monorepo, packageManagers, paths } = config;
  const pm = packageManagers.monorepo;
  const pmCmd = getPMCommands(pm);
  let root = paths.root;

  const commands: Record<MonorepoTool, () => Promise<void>> = {
    lerna: async () => {
      console.log(chalk.green(`📦 Installing Lerna in "${root}" with ${pm}...`));
      const [bin, args] = parseExecCommand(pmCmd.exec(`lerna`), ['init']);
      await execa(bin, args, {
        cwd: root,
        stdio: 'inherit',
      });
    },

    nx: async () => {
      const parent = path.dirname(root);
      const projectName = path.basename(root);
      console.log(chalk.green(`📦 Installing Nx in "${parent}" with ${pm}...`));
      const [bin, args] = parseExecCommand(pmCmd.exec(`${pm} create-nx-workspace@latest`), [
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
      console.log(chalk.green(`📦 Installing Turborepo in "${root}" with ${pm}...`));
      const [bin, args] = parseExecCommand(pmCmd.exec(`create-turbo@latest`), ['.']);
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
}
