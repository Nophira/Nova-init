import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const PREACT_CONFIG = {
  name: 'Preact',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: true,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'create vite@latest . -- --template preact-ts',
    javascript: 'create vite@latest . -- --template preact',
  },
};

export async function installPreact(
  targetPath: string, 
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {

    if (!PREACT_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Preact does not support language: ${language}. Supported: ${PREACT_CONFIG.supportedLanguages.join(', ')}`);
    }

   
    if (!PREACT_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Preact does not support package manager: ${packageManager}. Supported: ${PREACT_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Preact (${language}) in "${targetPath}"...`);

    
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = PREACT_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Preact (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Preact:`, error);
    throw error;
  }
}

export const getPreactConfig = () => PREACT_CONFIG;