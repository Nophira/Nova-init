import { execSync } from 'child_process';
import consola from 'consola';

export async function installQwik(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Qwik (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template typescript' : '-- --template javascript';

    execSync(`npm create qwik@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Qwik (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Qwik:`, error);
    throw error;
  }
}
