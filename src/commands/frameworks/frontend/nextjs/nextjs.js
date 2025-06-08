// commands/nextjs.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installNextJs(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Next.js (${language}) in "${targetPath}"...`));

  const templateFlag = language === 'TypeScript' ? '--typescript' : '';

  execSync(`npx create-next-app@latest . ${templateFlag}`, {
    cwd: targetPath,
    stdio: 'inherit',
  });
} 