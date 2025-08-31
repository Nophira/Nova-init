import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const ANGULAR_CONFIG = {
  name: 'Angular',
  supportedLanguages: ['typescript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 4200,
  installCommand: {
    default: 'npx @angular/cli@latest new',
  },
  createCommands: {
    typescript: 'npx @angular/cli@latest new . ',
  },
};

export async function installAngular(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
    
    if (!ANGULAR_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Angular does not support language: ${language}. Angular ist TypeScript-first. Supported: ${ANGULAR_CONFIG.supportedLanguages.join(', ')}`);
    }


    if (!ANGULAR_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Angular does not support package manager: ${packageManager}. Supported: ${ANGULAR_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Angular (${language}) in "${targetPath}"...`);

  
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);


    const baseCommand = ANGULAR_CONFIG.createCommands['typescript'];

   
    const command = `${baseCommand} --package-manager ${packageManager}`;
    

    const [mainCommand, ...args] = command.split(' ');
    
    await packageManagerUtils.executeCommand(targetPath, mainCommand, args);

    consola.success(`✅ Angular (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Angular:`, error);
    throw error;
  }
}

// Export configuration for external access if needed
export const getAngularConfig = () => ANGULAR_CONFIG;