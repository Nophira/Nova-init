import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const NEXTJS_CONFIG = {
  name: 'Next.js',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'create next-app@latest . --typescript',
    javascript: 'create next-app@latest . --javascript',
  },
};

export async function installNextJS(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
  
    if (!NEXTJS_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Next.js does not support language: ${language}. Supported: ${NEXTJS_CONFIG.supportedLanguages.join(', ')}`);
    }

    
    if (!NEXTJS_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Next.js does not support package manager: ${packageManager}. Supported: ${NEXTJS_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Next.js (${language}) in "${targetPath}"...`);

    
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = NEXTJS_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Next.js (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Next.js:`, error);
    throw error;
  }
}

export const getNextjsConfig = () => NEXTJS_CONFIG;