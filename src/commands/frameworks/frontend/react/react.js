// commands/react.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installReact(targetPath, projectName, language = 'JavaScript', useVite) {

  if(useVite === true){
    console.log(chalk.green(`\n⚛️ Installing React (${language}) in "${targetPath}"...`));

    const templateFlag = language === 'TypeScript' ? '-- --template react-ts' : '-- --template react';
  
    execSync(`npm create vite@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });

  }else{
    console.log(chalk.green(`\n⚛️ Installing React (${language}) in "${targetPath}"...`));

    const templateFlag = language === 'TypeScript' ? '--template typescript' : '';
  
    execSync(`npx create-react-app . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }
}
