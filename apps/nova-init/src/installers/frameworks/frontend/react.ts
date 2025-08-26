import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// React framework configuration
const REACT_CONFIG = {
  name: 'React',
  supportedLanguages: ['javascript', 'typescript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: true,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  installCommand: {
    withVite: 'npm create vite@latest',
    withoutVite: 'npx create-react-app',
    default: 'npm create vite@latest',
  },
  scripts: {
    dev: 'vite',
    build: 'vite build',
    start: 'vite preview',
    preview: 'vite preview',
  },
};

export async function installReact(
  targetPath: string, 
  projectName: string, 
  language: Language = 'javascript', 
  packageManager: PackageManager = 'npm',
  useVite: boolean = true
) {
  try {
    // Validate language support
    if (!REACT_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`React does not support language: ${language}. Supported: ${REACT_CONFIG.supportedLanguages.join(', ')}`);
    }
    
    // Validate package manager support
    if (!REACT_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`React does not support package manager: ${packageManager}. Supported: ${REACT_CONFIG.supportedPackageManagers.join(', ')}`);
    }
    
    // Validate Vite usage
    if (useVite && !REACT_CONFIG.supportsVite) {
      throw new Error(`React installer does not support Vite according to configuration.`);
    }
    
    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    // Use configuration-based install commands
    let command: string;
    
    if (useVite && REACT_CONFIG.supportsVite) {
      consola.info(`📦 Installing React (${language}) with Vite in "${targetPath}"...`);
      
      const templateSuffix = language === 'typescript' ? 'react-ts' : 'react';
      command = `${REACT_CONFIG.installCommand.withVite} . --template ${templateSuffix}`;
    } else {
      consola.info(`📦 Installing React (${language}) with Create React App in "${targetPath}"...`);
      
      const templateSuffix = language === 'typescript' ? ' --template typescript' : '';
      command = `${REACT_CONFIG.installCommand.withoutVite} .${templateSuffix}`;
    }
    
    // Execute install command
    PackageManagerUtils.execCommand(command, targetPath);

    // Switch to target package manager if different
    if (packageManager !== 'npm') {
      PackageManagerUtils.switchAndInstallDependencies(packageManager, targetPath);
    }
    
    consola.success(`✅ React (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install React:`, error);
    throw error;
  }
}

// Export configuration for external access if needed
export const getReactConfig = () => REACT_CONFIG;
