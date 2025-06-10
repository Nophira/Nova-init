// commands/fastify.js
import { execSync } from 'child_process';
import chalk from 'chalk';

export function installfastify(targetPath, projectName, language = 'JavaScript') {

  if(language === 'Typescript'){
   
    console.log(chalk.green(`\n⚛️ Installing Fastify (${language}) in "${targetPath}"...`));

    
  
    execSync(`npm init fastify@latest . -- --lang=ts`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }else{
    



    console.log(chalk.green(`\n⚛️ Installing Fastify (${language}) in "${targetPath}"...`));

   
  
    execSync(`npm init fastify@latest .`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }
}
