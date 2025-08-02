// commands/lit.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installLit(targetPath, projectName, language = 'JavaScript') {

    console.log(chalk.green(`\n⚛️ Installing Lit (${language}) in "${targetPath}"...`));

    const templateFlag = language === 'TypeScript' ? '-- --template lit-ts' : '-- --template lit';
  
    execSync(`npm create vite@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
}
