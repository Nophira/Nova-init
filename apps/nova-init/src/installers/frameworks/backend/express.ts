import { execSync } from 'child_process';
import consola from 'consola';
import { writeFileSync } from 'fs';
import * as path from 'path';

export async function installExpress(targetPath: string, language: string = 'JavaScript') {
  try {
    consola.info(`🛠 Installing Express (${language}) in "${targetPath}"...`);

    const exec = (cmd: string) =>
      execSync(cmd, { cwd: targetPath, stdio: 'inherit' }); 

    exec(`npm init -y`);
    exec(`npm install express`);

    if (language === 'TypeScript') {
      consola.info('Installing TypeScript dependencies...');
      exec(`npm install -D typescript @types/express ts-node-dev @types/node`);
      exec(`npx tsc --init`);

    
    } else {
      consola.info('Installing JavaScript version...');
      
    }
    
    consola.success(`✅ Express (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Express:`, error);
    throw error;
  }
}
