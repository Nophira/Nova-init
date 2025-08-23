import fs from 'fs-extra';
import path from 'path';
import { PackageManager } from './PackageManager.js';
import type { FrontendSetup, BackendSetup } from '../types/index.js';

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
    try {
      console.log(`  🔧 Installiere Frontend: ${frontend.framework}`);
      
      switch (frontend.framework) {
        case 'react':
          await this.installReact(targetPath, frontend, projectName);
          break;
        case 'nextjs':
          await this.installNextJS(targetPath, frontend, projectName);
          break;
        case 'vue':
          await this.installVue(targetPath, frontend, projectName);
          break;
        case 'svelte':
          await this.installSvelte(targetPath, frontend, projectName);
          break;
        case 'angular':
          await this.installAngular(targetPath, frontend, projectName);
          break;
        case 'nuxtjs':
          await this.installNuxtJS(targetPath, frontend, projectName);
          break;
        case 'astro':
          await this.installAstro(targetPath, frontend, projectName);
          break;
        case 'remix':
          await this.installRemix(targetPath, frontend, projectName);
          break;
        case 'solid':
          await this.installSolid(targetPath, frontend, projectName);
          break;
        case 'qwik':
          await this.installQwik(targetPath, frontend, projectName);
          break;
        case 'preact':
          await this.installPreact(targetPath, frontend, projectName);
          break;
        case 'lit':
          await this.installLit(targetPath, frontend, projectName);
          break;
        default:
          throw new Error(`Unbekanntes Frontend-Framework: ${frontend.framework}`);
      }
      
      console.log(`    ✅ Frontend ${frontend.framework} erfolgreich installiert`);
      
    } catch (error) {
      console.error(`    ❌ Fehler beim Installieren von ${frontend.framework}:`, error);
      throw error;
    }
  }

  async installBackend(
    targetPath: string, 
    backend: BackendSetup, 
    serviceName?: string
  ): Promise<void> {
    try {
      console.log(`  🔧 Installiere Backend: ${backend.framework}`);
      
      switch (backend.framework) {
        case 'express':
          await this.installExpress(targetPath, backend, serviceName);
          break;
        case 'nestjs':
          await this.installNestJS(targetPath, backend, serviceName);
          break;
        case 'fastify':
          await this.installFastify(targetPath, backend, serviceName);
          break;
        default:
          throw new Error(`Unbekanntes Backend-Framework: ${backend.framework}`);
      }
      
      console.log(`    ✅ Backend ${backend.framework} erfolgreich installiert`);
      
    } catch (error) {
      console.error(`    ❌ Fehler beim Installieren von ${backend.framework}:`, error);
      throw error;
    }
  }

  // React Installation mit bestehendem Installer
  private async installReact(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installReact } = await import('../installers/frameworks/frontend/react.js');
    await installReact(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager, 
      true // useVite
    );
  }

  // Next.js Installation mit bestehendem Installer
  private async installNextJS(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installNextJS } = await import('../installers/frameworks/frontend/nextjs.js');
    await installNextJS(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  // Vue Installation mit bestehendem Installer
  private async installVue(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installVue } = await import('../installers/frameworks/frontend/vue.js');
    await installVue(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  // Express Installation mit bestehendem Installer
  private async installExpress(targetPath: string, backend: BackendSetup, serviceName?: string): Promise<void> {
    const { installExpress } = await import('../installers/frameworks/backend/express.js');
    await installExpress(
      targetPath, 
      backend.language, 
      backend.packageManager
    );
  }

  // Weitere Framework-Installationen mit bestehenden Installern
  private async installSvelte(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installSvelte } = await import('../installers/frameworks/frontend/svelte.js');
    await installSvelte(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installAngular(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installAngular } = await import('../installers/frameworks/frontend/angular.js');
    await installAngular(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installNuxtJS(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installNuxtJS } = await import('../installers/frameworks/frontend/nuxtjs.js');
    await installNuxtJS(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installAstro(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installAstro } = await import('../installers/frameworks/frontend/astro.js');
    await installAstro(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installRemix(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installRemix } = await import('../installers/frameworks/frontend/remix.js');
    await installRemix(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installSolid(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installSolid } = await import('../installers/frameworks/frontend/solid.js');
    await installSolid(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installQwik(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installQwik } = await import('../installers/frameworks/frontend/qwik.js');
    await installQwik(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installPreact(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installPreact } = await import('../installers/frameworks/frontend/preact.js');
    await installPreact(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installLit(targetPath: string, frontend: FrontendSetup, projectName: string): Promise<void> {
    const { installLit } = await import('../installers/frameworks/frontend/lit.js');
    await installLit(
      targetPath, 
      projectName, 
      frontend.language, 
      frontend.packageManager
    );
  }

  private async installNestJS(targetPath: string, backend: BackendSetup, serviceName?: string): Promise<void> {
    const { installNestJS } = await import('../installers/frameworks/backend/nestjs.js');
    await installNestJS(
      targetPath, 
      backend.language, 
      backend.packageManager
    );
  }

  private async installFastify(targetPath: string, backend: BackendSetup, serviceName?: string): Promise<void> {
    const { installFastify } = await import('../installers/frameworks/backend/fastify.js');
    await installFastify(
      targetPath, 
      backend.language, 
      backend.packageManager
    );
  }
}
