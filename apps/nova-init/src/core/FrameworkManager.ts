import fs from 'fs-extra';
import path from 'path';
import type { FrontendSetup, BackendSetup, Language } from '../types/index.js';

// Import specific installers with their configurations
import { installReact, getReactConfig } from '../installers/frameworks/frontend/react.js';
import { installVue, getVueConfig } from '../installers/frameworks/frontend/vue.js';
import { installAngular, getAngularConfig } from '../installers/frameworks/frontend/angular.js';
import { installExpress, getExpressConfig } from '../installers/frameworks/backend/express.js';
import { installNestJS, getNestJSConfig } from '../installers/frameworks/backend/nestjs.js';
import { installFastify, getFastifyConfig } from '../installers/frameworks/backend/fastify.js';
import { installNextJS, getNextjsConfig } from '../installers/frameworks/frontend/nextjs.js';
import { installNuxtJS, getNuxtjsConfig } from '../installers/frameworks/frontend/nuxtjs.js';
import { installAstro, getAstroConfig } from '../installers/frameworks/frontend/astro.js';
import { installLit, getLitConfig } from '../installers/frameworks/frontend/lit.js';
import { installPreact, getPreactConfig } from '../installers/frameworks/frontend/preact.js';
import { installQwik, getQwikConfig } from '../installers/frameworks/frontend/qwik.js';
import { installRemix, getRemixConfig } from '../installers/frameworks/frontend/remix.js';
import { installSolid, getSolidConfig } from '../installers/frameworks/frontend/solid.js';
import { installSvelte, getSvelteConfig } from '../installers/frameworks/frontend/svelte.js';

export class FrameworkManager {

  constructor() {
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
      case 'nextjs':
        return installNextJS(targetPath, projectName, language, packageManager);
      case 'nuxtjs':
        return installNuxtJS(targetPath, projectName, language, packageManager);
      case 'astro':
        return installAstro(targetPath, projectName, language, packageManager);
      case 'lit':
        return installLit(targetPath, projectName, language, packageManager);
      case 'preact':
        return installPreact(targetPath, projectName, language, packageManager);
      case 'qwik':
    
        let qwikStarter: 'standart' | 'vite-ts' | 'vite-js';
        if (buildTool === 'vite') {
            qwikStarter = language === 'typescript' ? 'vite-ts' : 'vite-js';
        } else {
      
            qwikStarter = 'standart';
        }
        return installQwik(targetPath, projectName, language, packageManager, qwikStarter);
      case 'remix':
        return installRemix(targetPath, projectName, language, packageManager);
      case 'solid':
        return installSolid(targetPath, projectName, language, packageManager);
      case 'svelte':
        return installSvelte(targetPath, projectName, language, packageManager);
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