// commands/vue.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installVue(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Vue (${language}) in "${targetPath}"...`));

  const templateFlag = language === 'TypeScript' ? '-- --template vue-ts' : '-- --template vue';
  
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