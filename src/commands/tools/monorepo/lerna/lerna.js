// src/commands/tools/monorepo/lerna/lerna.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installLerna(targetPath, projectName) {
  console.log(chalk.green(`\n Installing Lerna (Monorepo) in "${targetPath}"...`));
  execSync(`npx lerna init`, {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 