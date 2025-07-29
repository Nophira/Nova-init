// commands/solid.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installSolid(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Solid (${language}) in "${targetPath}"...`));

  const templateFlag = language === 'TypeScript' ? '-- --template solid-ts' : '-- --template solid';
  
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