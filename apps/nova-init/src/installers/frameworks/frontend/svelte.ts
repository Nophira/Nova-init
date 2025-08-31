import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const SVELTE_CONFIG = {
  name: 'Svelte',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: true, 
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'npm create vite@latest . --template svelte-ts',
    javascript: 'npm create vite@latest . --template svelte',
  },
};

export async function installSvelte(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {

    if (!SVELTE_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Svelte does not support language: ${language}. Supported: ${SVELTE_CONFIG.supportedLanguages.join(', ')}`);
    }


    if (!SVELTE_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Svelte does not support package manager: ${packageManager}. Supported: ${SVELTE_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Svelte (${language}) in "${targetPath}"...`);

 
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = SVELTE_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Svelte (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Svelte:`, error);
    throw error;
  }
}

export const getSvelteConfig = () => SVELTE_CONFIG;