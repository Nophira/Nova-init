import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const VUE_CONFIG = {
  name: 'Vue',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: true,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'npm create vite@latest . -- --template vue-ts',
    javascript: 'npm create vite@latest . -- --template vue'
  },
};

export async function installVue(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {

    if (!VUE_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Vue does not support language: ${language}. Supported: ${VUE_CONFIG.supportedLanguages.join(', ')}`);
    }

   
    if (!VUE_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Vue does not support package manager: ${packageManager}. Supported: ${VUE_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Vue (${language}) in "${targetPath}"...`);

  
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = VUE_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Vue (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Vue:`, error);
    throw error;
  }
}

export const getVueConfig = () => VUE_CONFIG;