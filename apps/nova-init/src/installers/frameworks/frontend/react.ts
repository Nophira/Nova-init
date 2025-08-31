import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// React framework configuration
const REACT_CONFIG = {
  name: 'React',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: true,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  installCommand: {
 
    vite: 'npm create vite@latest . --template react',
    cra: 'npx create-react-app',
  },
 
  createCommands: {

    'cra-ts': 'npx create-react-app . --template typescript',
    'cra-js': 'npx create-react-app .',
  
    'vite-ts': 'npm create vite@latest . -- --template react-ts',
    'vite-js': 'npm create vite@latest . -- --template react',
  },
};

export async function installReact(
  targetPath: string,
  projectName: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm',
  useVite: boolean = true 
): Promise<void> {
  try {

    if (!REACT_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`React does not support language: ${language}. Supported: ${REACT_CONFIG.supportedLanguages.join(', ')}`);
    }

    
    if (!REACT_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`React does not support package manager: ${packageManager}. Supported: ${REACT_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing React (${language}) in "${targetPath}"...`);

 
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    let command: string;


    if (useVite) {

      command = language === 'typescript' ? REACT_CONFIG.createCommands['vite-ts'] : REACT_CONFIG.createCommands['vite-js'];
    } else {
    
      command = language === 'typescript' ? REACT_CONFIG.createCommands['cra-ts'] : REACT_CONFIG.createCommands['cra-js'];
    }
    
   
    const [mainCommand, ...args] = command.split(' ');
    
    await packageManagerUtils.executeCommand(targetPath, mainCommand, args);

    consola.success(`✅ React (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install React:`, error);
    throw error;
  }
}

export const getReactConfig = () => REACT_CONFIG;