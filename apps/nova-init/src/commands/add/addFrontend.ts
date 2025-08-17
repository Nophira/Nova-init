import consola from 'consola';
import * as fs from 'fs/promises';
import path from 'path';
import { installReact } from './../../installers/frameworks/frontend/react.js';
import { installNextJs } from './../../installers/frameworks/frontend/nextjs.js';
import { installVue } from './../../installers/frameworks/frontend/vue.js';
import { installSvelte } from './../../installers/frameworks/frontend/svelte.js';
import { installAngular } from './../../installers/frameworks/frontend/angular.js';
import { installNuxtJs } from './../../installers/frameworks/frontend/nuxtjs.js';
import { installAstro } from './../../installers/frameworks/frontend/astro.js';
import { installRemix } from './../../installers/frameworks/frontend/remix.js';
import { installSolid } from './../../installers/frameworks/frontend/solid.js';
import { installQwik } from './../../installers/frameworks/frontend/qwik.js';
import { installPreact } from './../../installers/frameworks/frontend/preact.js';
import { installLit } from './../../installers/frameworks/frontend/lit.js';

export async function addFrontend(options: any): Promise<void> {
  consola.info(`Adding frontend with framework ${options.framework} and language ${options.lang}`);

  const projectPath = process.cwd();
  const frontendPath = path.join(projectPath, options.folder || 'frontend');

  try {
    await fs.mkdir(frontendPath, { recursive: true });
    consola.success(`Created frontend directory: ${frontendPath}`);

    const languageFlag = options.lang === 'typescript' ? 'typescript' : 'javascript';

    switch (options.framework) {
      case 'react':
        await installReact(frontendPath, options.projectName, languageFlag, !!options.vite); // Use Vite
        break;
      case 'next':
        await installNextJs(frontendPath, options.projectName, languageFlag);
        break;
      case 'vue':
        await installVue(frontendPath, options.projectName, languageFlag);
        break;
      case 'svelte':
        await installSvelte(frontendPath, options.projectName, languageFlag);
        break;
      case 'angular':
        await installAngular(frontendPath, options.projectName, languageFlag);
        break;
      case 'nuxt':
        await installNuxtJs(frontendPath, options.projectName, languageFlag);
        break;
      case 'astro':
        await installAstro(frontendPath, options.projectName, languageFlag);
        break;
      case 'remix':
        await installRemix(frontendPath, options.projectName, languageFlag);
        break;
      case 'solid':
        await installSolid(frontendPath, options.projectName, languageFlag);
        break;
      case 'qwik':
        await installQwik(frontendPath, options.projectName, languageFlag);
        break;
      case 'preact':
        await installPreact(frontendPath, options.projectName, languageFlag);
        break;
      case 'lit':
        await installLit(frontendPath, options.projectName, languageFlag);
        break;
      default:
        consola.warn(`⚠️ Unknown frontend framework: ${options.framework}`);
    }

    consola.success(`✅ Frontend (${options.framework}) created successfully`);
  } catch (error) {
    consola.error(`❌ Failed to add frontend: ${error}`);
  }
}
