import { execSync } from 'child_process';
import consola from 'consola';

export async function installLit(targetPath: string, projectName: string, language: string = 'JavaScript') {
  try {
    consola.info(`⚛️ Installing Lit (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '-- --template typescript' : '-- --template javascript';

    execSync(`npm create @lit/create-element@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ Lit (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Lit:`, error);
    throw error;
  }
}
