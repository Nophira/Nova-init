import { execSync } from 'child_process';
import consola from 'consola';

export async function installAngular(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Angular (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '--typescript' : '';

    execSync(`npx @angular/cli@latest new . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Angular (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Angular:`, error);
    throw error;
  }
}
