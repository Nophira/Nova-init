import { execSync } from 'child_process';
import consola from 'consola';

export async function installNuxtJs(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Nuxt.js (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '--typescript' : '';

    execSync(`npx nuxi@latest init . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Nuxt.js (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Nuxt.js:`, error);
    throw error;
  }
}
