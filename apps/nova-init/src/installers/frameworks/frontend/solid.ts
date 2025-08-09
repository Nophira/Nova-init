import { execSync } from 'child_process';
import consola from 'consola';

export async function installSolid(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Solid (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template ts' : '-- --template js';

    execSync(`npm create solid@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Solid (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Solid:`, error);
    throw error;
  }
}
