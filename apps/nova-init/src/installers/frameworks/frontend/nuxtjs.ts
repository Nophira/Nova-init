import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const NUXTJS_CONFIG = {
  name: 'Nuxt.js',
  supportedLanguages: ['typescript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'npx nuxi@latest init . --template'
  },
};

export async function installNuxtJS(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {

    if (!NUXTJS_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Nuxt.js does not support language: ${language}. Supported: ${NUXTJS_CONFIG.supportedLanguages.join(', ')}`);
    }

   
    if (!NUXTJS_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Nuxt.js does not support package manager: ${packageManager}. Supported: ${NUXTJS_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Nuxt.js (${language}) in "${targetPath}"...`);

 
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = NUXTJS_CONFIG.createCommands['typescript'];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Nuxt.js (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Nuxt.js:`, error);
    throw error;
  }
}

export const getNuxtjsConfig = () => NUXTJS_CONFIG;