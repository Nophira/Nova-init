// commands/nuxtjs.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installNuxtJs(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Nuxt.js (${language}) in "${targetPath}"...`));

  const templateFlag = language === 'TypeScript' ? '--typescript' : '';

  execSync(`npx nuxi@latest init . ${templateFlag}`, {
    cwd: targetPath,
    stdio: 'inherit',
  });

  // Install dependencies
  execSync('npm install', {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 