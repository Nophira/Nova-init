import { execSync } from 'child_process';
import consola from 'consola';

export async function installSvelte(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Svelte (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template svelte-ts' : '-- --template svelte';

    execSync(`npm create svelte@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Svelte (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Svelte:`, error);
    throw error;
  }
}
