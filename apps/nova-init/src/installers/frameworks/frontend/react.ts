import { execSync } from 'child_process';
import consola from 'consola';

export async function installReact(targetPath: string, projectName: string, language: string = 'JavaScript', useVite: boolean = true) {
  try {
    if (useVite) {
      consola.info(`⚛️ Installing React (${language}) with Vite in "${targetPath}"...`);

      const templateFlag = language === 'TypeScript' ? '-- --template react-ts' : '-- --template react';
    
      execSync(`npm create vite@latest . ${templateFlag}`, {
        cwd: targetPath,
        stdio: 'inherit',
      });
    } else {
      consola.info(`⚛️ Installing React (${language}) with Create React App in "${targetPath}"...`);

      const templateFlag = language === 'TypeScript' ? '--template typescript' : '';
    
      execSync(`npx create-react-app . ${templateFlag}`, {
        cwd: targetPath,
        stdio: 'inherit',
      });
    }
    
    consola.success(`✅ React (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install React:`, error);
    throw error;
  }
}
