import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// Vue framework configuration
const VUE_CONFIG = {
  name: 'Vue.js',
  supportedLanguages: ['javascript', 'typescript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[],
  supportsVite: true,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  installCommand: {
    default: 'npm create vue@latest',
  },
  createCommands: {
    typescript: 'npm create vue@latest . -- --typescript --jsx --router --pinia --vitest --eslint --prettier',
    javascript: 'npm create vue@latest . -- --jsx --router --pinia --vitest --eslint --prettier',
  },
  scripts: {
    dev: 'vite',
    build: 'vite build',
    start: 'vite preview',
    preview: 'vite preview',
  },
};

export async function installVue(
  targetPath: string, 
  projectName: string, 
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
) {
  try {
    // Validate language support
    if (!VUE_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Vue does not support language: ${language}. Supported: ${VUE_CONFIG.supportedLanguages.join(', ')}`);
    }
    
    // Validate package manager support
    if (!VUE_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Vue does not support package manager: ${packageManager}. Supported: ${VUE_CONFIG.supportedPackageManagers.join(', ')}`);
    }
    
    consola.info(`📦 Installing Vue.js (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }
    
    // Use Vue create command with appropriate options
    const command = VUE_CONFIG.createCommands[language];
    PackageManagerUtils.execCommand(command, targetPath);
    
    // Switch to target package manager if different from npm
    if (packageManager !== 'npm') {
      PackageManagerUtils.switchAndInstallDependencies(packageManager, targetPath);
    }
    
    consola.success(`✅ Vue.js (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Vue.js:`, error);
    throw error;
  }
}

// Export configuration for external access if needed
export const getVueConfig = () => VUE_CONFIG;
