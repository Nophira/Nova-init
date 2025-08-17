import consola from 'consola';
import * as fs from 'fs/promises';
import path from 'path';
import { CreateCommands } from '@commands/commands/create-commands.js';

export async function addMonorepo(options: any): Promise<void> {
  consola.info(`Adding monorepo with tool ${options.tool}`);

  const projectPath = process.cwd();
  const monorepoPath = path.join(projectPath, options.folder || 'monorepo');

  try {
    await fs.mkdir(monorepoPath, { recursive: true });
    consola.success(`Created monorepo directory: ${monorepoPath}`);

    switch (options.tool) {
      case 'turborepo':
        await CreateCommands.createTurborepo(monorepoPath, 'pnpm');
        break;
      case 'nx':
        await CreateCommands.createNx(monorepoPath, 'pnpm');
        break;
      case 'lerna':
        await CreateCommands.createLerna(monorepoPath, 'pnpm');
        break;
      default:
        consola.warn(`⚠️ Unknown monorepo tool: ${options.tool}`);
    }

    consola.success(`✅ Monorepo (${options.tool}) added successfully`);
  } catch (error) {
    consola.error(`❌ Failed to add monorepo: ${error}`);
  }
}
