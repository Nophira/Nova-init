// src/utils/packageManagerCommands.ts

import fs from 'fs-extra';
import * as path from 'path';
import type { PackageManager } from '../../types/types.js';

type PMCommandSet = {
  install: string;
  run: (script: string) => string;
  exec: (command: string) => string;
  setupWorkspace?: (rootPath: string, workspaces: string[]) => Promise<void>;
};

const commandMap: Record<PackageManager, PMCommandSet> = {
  npm: {
    install: 'npm install',
    run: (script) => `npm run ${script}`,
    exec: (command) => `npx ${command}`,
  },
  bun: {
    install: 'npm install && bun install',
    run: (script) => `bun run ${script}`,
    exec: (command) => `bunx ${command}`,
  },
  pnpm: {
    install: 'pnpm install',
    run: (script) => `pnpm ${script}`,
    exec: (command) => `pnpm dlx ${command}`,

    async setupWorkspace(rootPath: string, workspaces: string[]) {
      const workspacePath = path.join(rootPath, 'pnpm-workspace.yaml');
      const yamlContent = `packages:\n${workspaces.map(ws => `  - ${ws}/`).join('\n')}\n`;

      try {
        await fs.writeFile(workspacePath, yamlContent);
        console.log(`📦 pnpm workspace created at: ${workspacePath}`);
      } catch (error) {
        console.error(`❌ Failed to write pnpm-workspace.yaml:`, error);
        throw error;
      }
    },
  },
};

export function getPMCommands(pm: PackageManager): PMCommandSet {
  return commandMap[pm];
}
