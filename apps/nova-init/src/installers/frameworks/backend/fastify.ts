import { execSync } from 'child_process';
import consola from 'consola';
import { writeFileSync } from 'fs';
import * as path from 'path';

export async function installFastify(targetPath: string, language: string = 'JavaScript') {
  try {
    consola.info(`🛠 Installing Fastify (${language}) in "${targetPath}"...`);

    const exec = (cmd: string) =>
      execSync(cmd, { cwd: targetPath, stdio: 'inherit' }); 

    exec(`npm init -y`);
    exec(`npm install fastify`);

    if (language === 'TypeScript') {
      consola.info('Installing TypeScript dependencies...');
      exec(`npm install -D typescript @types/node ts-node-dev`);
      exec(`npx tsc --init`);

      
    } else {
      consola.info('Installing JavaScript version...');
    }
    
    consola.success(`✅ Fastify (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Fastify:`, error);
    throw error;
  }
}
