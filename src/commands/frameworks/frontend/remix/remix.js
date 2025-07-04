// commands/remix.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installRemix(targetPath, projectName, language = 'TypeScript') {

    console.log(chalk.green(`\n⚛️ Installing Remix (TypeScript) in "${targetPath}"...`));

    
  
    execSync(`npx create-remix@latest .`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
}
