// commands/turborepo.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installTurbo(targetPath, projectName) {
  console.log(chalk.green(`\n Installing Turborepo (Monorepo) in "${targetPath}"...`));

  

  execSync(`npx create-turbo@latest .`, {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 