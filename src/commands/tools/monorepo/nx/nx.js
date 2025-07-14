// commands/nx.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installNx(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n Installing NX (Monorepo) in "${targetPath}"...`));

  

  execSync(`npx create-nx-workspace .`, {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 