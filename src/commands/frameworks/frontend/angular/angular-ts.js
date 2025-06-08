// angular.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installAngular(targetPath, projectName) {
  console.log(chalk.green(`\n📦 Installing Angular in "${targetPath}"...`));

  try {
    // Angular CLI lokal installieren (falls nicht vorhanden)
    execSync(`npm install -g @angular/cli`, { stdio: 'inherit' });

    // Angular-Projekt erstellen (im Zielordner, ohne vorher npm init)
    execSync(`ng new ${projectName} --directory=.  --skip-install`, {
      cwd: targetPath,
      stdio: 'inherit'
    });


  } catch (error) {
    console.error(chalk.red('\n❌ Error during Angular installation:'));
    console.error(error);
    throw error;
  }
}
