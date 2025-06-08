// commands/preact.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installPreact(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Preact (${language}) in "${targetPath}"...`));

  const templateFlag = language === 'TypeScript' ? '-- --template preact-ts' : '-- --template preact';
  
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