import { execSync } from 'child_process';
import consola from 'consola';

export async function installNextJs(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Next.js (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '--typescript' : '';

    execSync(`npx create-next-app@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Next.js (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Next.js:`, error);
    throw error;
  }
}
