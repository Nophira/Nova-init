// commands/Lerna.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installNextJs(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n Installing Lerna (Monorepo) in "${targetPath}"...`));

  

  execSync(`npx lerna init .`, {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 