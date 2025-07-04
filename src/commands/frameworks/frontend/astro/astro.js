// commands/astro.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installAstro(targetPath, projectName, language = 'TypeScript') {

    console.log(chalk.green(`\n⚛️ Installing Astro (TypeScript) in "${targetPath}"...`));

    
  
    execSync(`npm create astro@latest .`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
}
