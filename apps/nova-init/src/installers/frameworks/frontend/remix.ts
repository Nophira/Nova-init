import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const REMIX_CONFIG = {
  name: 'Remix',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
 
  installCommand: {
    default: 'npx create-remix@latest',
  },
};

export async function installRemix(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {

    if (!REMIX_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Remix does not support language: ${language}. Supported: ${REMIX_CONFIG.supportedLanguages.join(', ')}`);
    }

   
    if (!REMIX_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Remix does not support package manager: ${packageManager}. Supported: ${REMIX_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Remix in "${targetPath}"...`);


    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);


    const command = REMIX_CONFIG.installCommand.default;
    
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Remix installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Remix:`, error);
    throw error;
  }
}

export const getRemixConfig = () => REMIX_CONFIG;