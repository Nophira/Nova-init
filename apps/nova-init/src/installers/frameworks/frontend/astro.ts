import { execSync } from 'child_process';
import consola from 'consola';

export async function installAstro(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Astro (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template minimal' : '-- --template minimal';

    execSync(`npm create astro@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Astro (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Astro:`, error);
    throw error;
  }
}
