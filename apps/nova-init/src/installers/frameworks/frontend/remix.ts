import { execSync } from 'child_process';
import consola from 'consola';

export async function installRemix(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Remix (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '--typescript' : '';

    execSync(`npx create-remix@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Remix (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Remix:`, error);
    throw error;
  }
}
