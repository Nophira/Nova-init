import type { FrontendSetup, BackendSetup } from '../types/index.js';
import { installFramework } from '../installers/frameworks/frameworks-installers.js';

export class FrameworkManager {
  constructor() {}

  async installFrontend(
    targetPath: string,
    frontend: FrontendSetup,
    projectName: string
  ): Promise<void> {
    const { framework, language, packageManager, buildTool } = frontend;

   

    // Neue vereinfachte Variante
    return installFramework(framework, targetPath, language, packageManager, buildTool);
  }

  async installBackend(
    targetPath: string,
    backend: BackendSetup,
    serviceName?: string
  ): Promise<void> {
    const { framework, language, packageManager } = backend;

    return installFramework(framework, targetPath, language, packageManager);
  }
}
