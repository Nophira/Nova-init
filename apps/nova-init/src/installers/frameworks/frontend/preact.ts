import { execSync } from 'child_process';
import consola from 'consola';

export async function installPreact(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Preact (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template typescript' : '-- --template default';

    execSync(`npm create preact@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Preact (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Preact:`, error);
    throw error;
  }
}
