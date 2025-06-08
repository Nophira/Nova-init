// commands/svelte.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installSvelte(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Svelte (${language}) in "${targetPath}"...`));

  const templateFlag = language === 'TypeScript' ? '-- --template svelte-ts' : '-- --template svelte';
  
  execSync(`npm create vite@latest . ${templateFlag}`, {
    cwd: targetPath,
    stdio: 'inherit',
  });

  // Install dependencies
  execSync('npm install', {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 