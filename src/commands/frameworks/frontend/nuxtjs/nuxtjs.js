// commands/nuxtjs.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installNuxtJs(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Nuxt.js in "${targetPath}"...`));

  

  execSync(`npx nuxi@latest init .`, {
    cwd: targetPath,
    stdio: 'inherit',
  });

  // Install dependencies
  execSync('npm install', {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 