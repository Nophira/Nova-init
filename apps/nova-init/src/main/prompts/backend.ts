import { 
  askBackendLanguage, 
  askBackendFramework, 
  askBackendFolderName, 
  askBackendPackageManager 
} from '../../main/functions/backend.js';
import { askUseMicroservices, askMicroserviceNames } from '../functions/microservice.js';
import type { PackageManager } from '../../types/types.js';

export interface BackendSetup {
  language: 'javascript' | 'typescript';
  framework: string;
  useMicroservices: boolean;
  microserviceNames?: string[];
  folderName?: string;
  packageManager: PackageManager;
}

export async function promptBackend(hasMonorepo: boolean): Promise<BackendSetup> {
  const language = await askBackendLanguage();
  const framework = await askBackendFramework();
  const useMicroservices = await askUseMicroservices();
  
  let microserviceNames: string[] | undefined;
  let folderName: string | undefined;
  
  if (useMicroservices) {
    microserviceNames = await askMicroserviceNames();
  } else {
    folderName = await askBackendFolderName();
  }
  
  const packageManager = await askBackendPackageManager();

  return {
    language,
    framework,
    useMicroservices,
    microserviceNames,
    folderName,
    packageManager,
  };
}
