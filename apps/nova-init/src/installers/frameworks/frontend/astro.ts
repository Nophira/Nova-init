import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const ASTRO_CONFIG = {
  name: 'Astro',
  supportedLanguages: ['typescript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm'] as PackageManager[], 
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'create astro@latest . --template basic', 
  },
};

export async function installAstro(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
  
    if (!ASTRO_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Astro does not support language: ${language}. Supported: ${ASTRO_CONFIG.supportedLanguages.join(', ')}`);
    }


    if (!ASTRO_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Astro does not support package manager: ${packageManager}. Supported: ${ASTRO_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Astro (${language}) in "${targetPath}"...`);

  
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = ASTRO_CONFIG.createCommands['typescript'];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Astro (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Astro:`, error);
    throw error;
  }
}

export const getAstroConfig = () => ASTRO_CONFIG;