// commands/qwik.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installQwik(targetPath, projectName, language = 'JavaScript') {
  console.log(chalk.green(`\n⚛️ Installing Qwik (${language}) in "${targetPath}"...`));

  // Erstelle ein neues Qwik-Projekt mit dem "empty" Template
  execSync(`npm create qwik@latest empty . --installDeps`, {
    cwd: targetPath,
    stdio: 'inherit',
  });

  // Installiere zusätzliche TypeScript-Abhängigkeiten, wenn TypeScript ausgewählt wurde
  if (language === 'TypeScript') {
    execSync('npm install --save-dev typescript @types/node', {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }
} 