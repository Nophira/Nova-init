import { execSync } from 'child_process';
import consola from 'consola';

export async function installNestJS(targetPath: string, language: string = 'JavaScript') {
  try {
    consola.info(`🛠 Installing NestJS (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'TypeScript' ? '--package-manager npm' : '--package-manager npm';

    execSync(`npx @nestjs/cli@latest new . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    consola.success(`✅ NestJS (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install NestJS:`, error);
    throw error;
  }
}
