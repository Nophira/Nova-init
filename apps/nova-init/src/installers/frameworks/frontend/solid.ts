import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const SOLID_CONFIG = {
  name: 'Solid',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: true, 
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'npm create vite@latest . -- --template solid-ts',
    javascript: 'npm create vite@latest . -- --template solid',
  },
};

export async function installSolid(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {

    if (!SOLID_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Solid does not support language: ${language}. Supported: ${SOLID_CONFIG.supportedLanguages.join(', ')}`);
    }

 
    if (!SOLID_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Solid does not support package manager: ${packageManager}. Supported: ${SOLID_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Solid (${language}) in "${targetPath}"...`);


    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = SOLID_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Solid (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Solid:`, error);
    throw error;
  }
}

export const getSolidConfig = () => SOLID_CONFIG;