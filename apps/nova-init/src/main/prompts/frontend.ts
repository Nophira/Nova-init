import { 
  askFrontendLanguage, 
  askFrontendFramework, 
  askFrontendFolderName, 
  askFrontendPackageManager 
} from '../../main/functions/frontend.js';
import type { PackageManager } from '../../types/types.js';

export interface FrontendSetup {
  language: 'javascript' | 'typescript';
  framework: string;
  folderName: string;
  packageManager: PackageManager;
}

export async function promptFrontend(hasMonorepo: boolean): Promise<FrontendSetup> {
  const language = await askFrontendLanguage();
  const framework = await askFrontendFramework();
  const folderName = await askFrontendFolderName();
  const packageManager = await askFrontendPackageManager();

  return {
    language,
    framework,
    folderName,
    packageManager,
  };
}
