// src/commands/tools/monorepo/nx/nx.js
import { execSync } from 'child_process';
import chalk from 'chalk';
import path from 'path';

export function installNx(targetPath, projectName) {
  console.log(chalk.green(`\n Installing NX (Monorepo) in "${targetPath}"...`));
  // Parent-Ordner bestimmen
  const parentDir = path.dirname(targetPath);
  execSync(`npx create-nx-workspace@latest ${projectName}`, {
    cwd: parentDir,
    stdio: 'inherit',
  });
} 