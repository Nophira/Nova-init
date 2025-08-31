import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const LIT_CONFIG = {
  name: 'Lit',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], 
  supportsVite: true, 
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'create vite@latest . -- --template lit-ts', 
    javascript: 'create vite@latest . -- --template lit', 
  },
};

export async function installLit(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
 
    if (!LIT_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Lit does not support language: ${language}. Supported: ${LIT_CONFIG.supportedLanguages.join(', ')}`);
    }


    if (!LIT_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Lit does not support package manager: ${packageManager}. Supported: ${LIT_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Lit (${language}) in "${targetPath}"...`);

    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    const command = LIT_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Lit (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Lit:`, error);
    throw error;
  }
}

export const getLitConfig = () => LIT_CONFIG;