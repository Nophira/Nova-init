import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';


const QWIK_CONFIG = {
  name: 'Qwik',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: true,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,

  installCommands: {
    'standart': 'npm create qwik@latest',
    'vite-ts': 'npm create vite@latest . -- --template qwik-ts',
    'vite-js': 'npm create vite@latest . -- --template qwik',
  },
};

export async function installQwik(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm',
  starter: 'standart' | 'vite-ts' | 'vite-js'
): Promise<void> {
  try {
  
    if (!QWIK_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Qwik does not support package manager: ${packageManager}. Supported: ${QWIK_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Qwik with "${starter}" starter in "${targetPath}"...`);


    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);


    const command = QWIK_CONFIG.installCommands[starter];

    if (!command) {
      throw new Error(`Invalid Qwik starter option: ${starter}`);
    }


    const [mainCommand, ...args] = command.split(' ');
    
    await packageManagerUtils.executeCommand(targetPath, mainCommand, args);

    consola.success(`✅ Qwik installed successfully with ${packageManager} using the "${starter}" starter.`);
  } catch (error) {
    consola.error(`❌ Failed to install Qwik:`, error);
    throw error;
  }
}

export const getQwikConfig = () => QWIK_CONFIG;