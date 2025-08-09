import consola from 'consola';
import * as path from 'path';
import { installReact } from './frameworks/frontend/react.js';
import { installNextJs } from './frameworks/frontend/nextjs.js';
import { installVue } from './frameworks/frontend/vue.js';
import { installSvelte } from './frameworks/frontend/svelte.js';
import { installAngular } from './frameworks/frontend/angular.js';
import { installNuxtJs } from './frameworks/frontend/nuxtjs.js';
import { installAstro } from './frameworks/frontend/astro.js';
import { installRemix } from './frameworks/frontend/remix.js';
import { installSolid } from './frameworks/frontend/solid.js';
import { installQwik } from './frameworks/frontend/qwik.js';
import { installPreact } from './frameworks/frontend/preact.js';
import { installLit } from './frameworks/frontend/lit.js';

interface FrontendOptions {
  framework?: string;
  lang?: string;
  vite?: boolean;
  folder?: string;
}

export async function addFrontend(options: FrontendOptions) {
  const { framework, lang = 'js', vite = false, folder = 'frontend' } = options;

  if (!framework) {
    consola.error('Framework is required. Use --framework <framework>');
    process.exit(1);
  }

  const language = lang === 'ts' ? 'TypeScript' : 'JavaScript';
  const targetPath = path.resolve(process.cwd(), folder);

  consola.info(`🎨 Adding frontend: ${framework} (${language}) in ${folder}`);

  try {
    switch (framework.toLowerCase()) {
      case 'react':
        await installReact(targetPath, folder, language, vite);
        break;
      case 'nextjs':
        await installNextJs(targetPath, folder, language);
        break;
      case 'vue':
        await installVue(targetPath, folder, language);
        break;
      case 'svelte':
        await installSvelte(targetPath, folder, language);
        break;
      case 'angular':
        await installAngular(targetPath, folder, language);
        break;
      case 'nuxtjs':
        await installNuxtJs(targetPath, folder, language);
        break;
      case 'astro':
        await installAstro(targetPath, folder, language);
        break;
      case 'remix':
        await installRemix(targetPath, folder, language);
        break;
      case 'solid':
        await installSolid(targetPath, folder, language);
        break;
      case 'qwik':
        await installQwik(targetPath, folder, language);
        break;
      case 'preact':
        await installPreact(targetPath, folder, language);
        break;
      case 'lit':
        await installLit(targetPath, folder, language);
        break;
      default:
        consola.error(`Unknown framework: ${framework}`);
        consola.info('Available frameworks: react, nextjs, vue, svelte, angular, nuxtjs, astro, remix, solid, qwik, preact, lit');
        process.exit(1);
    }

    consola.success(`✅ Frontend ${framework} (${language}) added successfully in ${folder}`);
    consola.info(`📁 Next steps:`);
    consola.info(`   cd ${folder}`);
    consola.info(`   npm install`);
    consola.info(`   npm run dev`);
  } catch (error) {
    consola.error(`❌ Failed to add frontend ${framework}:`, error);
    process.exit(1);
  }
}
