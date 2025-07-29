// commands/nestjs.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installNestJs(targetPath, projectName) {

  
    console.log(chalk.green(`\n⚛️ Installing NestJs in "${targetPath}"...`));

    execSync(`npm i -g @nestjs/cli`, {
      cwd: targetPath,
      stdio: 'inherit',
  });

  execSync(`nest new .`, {
    cwd: targetPath,
    stdio: 'inherit',
});
}
