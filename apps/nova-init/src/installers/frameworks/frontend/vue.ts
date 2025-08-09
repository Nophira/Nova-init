import { execSync } from 'child_process';
import consola from 'consola';

export async function installVue(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Vue.js (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template vue-ts' : '-- --template vue';

    execSync(`npm create vue@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Vue.js (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Vue.js:`, error);
    throw error;
  }
}
