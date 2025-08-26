import fs from 'fs-extra';
import path from 'path';
import { PackageManager } from './PackageManager.js';
import type { FrontendSetup, BackendSetup, Language } from '../types/index.js';

// Import specific installers with their configurations
import { installReact, getReactConfig } from '../installers/frameworks/frontend/react.js';
import { installVue, getVueConfig } from '../installers/frameworks/frontend/vue.js';
import { installAngular, getAngularConfig } from '../installers/frameworks/frontend/angular.js';
import { installExpress, getExpressConfig } from '../installers/frameworks/backend/express.js';
import { installNestJS, getNestJSConfig } from '../installers/frameworks/backend/nestjs.js';
import { installFastify, getFastifyConfig } from '../installers/frameworks/backend/fastify.js';

export class FrameworkManager {
  private packageManager: PackageManager;

  constructor() {
    this.packageManager = new PackageManager();
  }

  async installFrontend(
    targetPath: string, 
    frontend: FrontendSetup, 
    projectName: string
  ): Promise<void> {
    const { framework, language, packageManager, buildTool } = frontend;
    
    switch (framework) {
      case 'react':
        return installReact(targetPath, projectName, language, packageManager, buildTool === 'vite');
      case 'vue':
        return installVue(targetPath, projectName, language, packageManager);
      case 'angular':
        return installAngular(targetPath, projectName, language, packageManager);
      default:
        throw new Error(`Frontend framework ${framework} is not supported yet`);
    }
  }

  async installBackend(
    targetPath: string, 
    backend: BackendSetup, 
    serviceName?: string
  ): Promise<void> {
    const { framework, language, packageManager } = backend;
    
    switch (framework) {
      case 'express':
        return installExpress(targetPath, language, packageManager);
      case 'nestjs':
        return installNestJS(targetPath, language, packageManager);
      case 'fastify':
        return installFastify(targetPath, language, packageManager);
      default:
        throw new Error(`Backend framework ${framework} is not supported yet`);
    }
  }
}
