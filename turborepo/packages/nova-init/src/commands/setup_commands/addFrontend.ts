// src/commands/setup_commands/addFrontend.js
import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { installReact } from '../frameworks/frontend/react/react.js';
import { installAngular } from '../frameworks/frontend/angular/angular-ts.js';
import { installLit } from '../frameworks/frontend/lit/lit.js';
import { installNextJs } from '../frameworks/frontend/nextjs/nextjs.js';
import { installNuxtJs } from '../frameworks/frontend/nuxtjs/nuxtjs.js';
import { installPreact } from '../frameworks/frontend/preact/preact.js';
import { installQwik } from '../frameworks/frontend/qwik/qwik.js';
import { installSolid } from '../frameworks/frontend/solid/solid.js';
import { installSvelte } from '../frameworks/frontend/svelte/svelte.js';
import { installVue } from '../frameworks/frontend/vue/vue.js';
import { installRemix } from '../frameworks/frontend/remix/remix.js';
import { installAstro } from '../frameworks/frontend/astro/astro.js';

const viteOnlyFrameworks = ['solid', 'svelte', 'vue', 'lit', 'preact', 'nuxtjs', 'qwik'];

export default async function addFrontend(argv) {
  try {
    const args = minimist(argv);
    const framework = args.framework;
    const lang = args.lang || 'JavaScript';
    const useVite = args.vite ?? false;
    const folderName = args.folder || 'frontend';

    console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 📦 Parsing arguments...') + chalk.bold.cyan('                                    ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    console.log('Arguments:', args);

    if (!framework) {
      console.log(chalk.bold.red('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Please specify a frontend framework using --framework') + chalk.bold.red('    ║'));
      console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));

      console.log(chalk.bold.yellow('\n📚 Available frameworks:'));
      console.log(chalk.gray('  • React (with/without Vite)'));
      console.log(chalk.gray('  • Angular (TypeScript only)'));
      console.log(chalk.gray('  • Next.js (JavaScript/TypeScript)'));
      console.log(chalk.gray('  • Nuxt.js (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Preact (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Qwik (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Solid (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Svelte (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Vue (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Lit (JavaScript/TypeScript, Vite only)'));
      console.log(chalk.gray('  • Astro (TypeScript only)'));
      console.log(chalk.gray('  • Remix (TypeScript/ Vite only)'));



      console.log(chalk.bold.yellow('\n⚙️ Optional arguments:'));
      console.log(chalk.cyan('  --folder <name>') + chalk.gray('    Specify custom folder name (default: frontend)'));
      console.log(chalk.cyan('  --lang <language>') + chalk.gray('  Specify language (JavaScript/TypeScript)'));
      console.log(chalk.cyan('  --vite') + chalk.gray('            Use Vite instead of normal installation (React only)'));

      console.log(chalk.bold.yellow('\n📝 Example:'));
      console.log(chalk.green('  npx nova-init add frontend --folder my-app --framework react --lang TypeScript --vite'));
      return;
    }

    const targetPath = path.join(process.cwd(), folderName);
    
    if (!fs.existsSync(targetPath)) {
      console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` 📁 Creating directory at ${targetPath}`) + chalk.bold.cyan('                    ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════════════════════════════════╝'));
      fs.mkdirSync(targetPath, { recursive: true });
    }

    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🎨 Installing ${framework} (${lang})...`) + chalk.bold.cyan('                          ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    
    if (viteOnlyFrameworks.includes(framework.toLowerCase())) {
      console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(' ⚡ Using Vite as build tool') + chalk.bold.cyan('                                ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    } else if (useVite) {
      console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(' ⚡ Using Vite as build tool') + chalk.bold.cyan('                                ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    }

    switch (framework.toLowerCase()) {
      case 'react':
        await installReact(targetPath, folderName, lang, useVite);
        break;
      case 'angular':
        await installAngular(targetPath, folderName);
        break;
      case 'nextjs':
        await installNextJs(targetPath, folderName, lang);
        break;
      case 'nuxtjs':
        await installNuxtJs(targetPath, folderName, lang);
        break;
      case 'preact':
        await installPreact(targetPath, folderName, lang);
        break;
      case 'qwik':
        await installQwik(targetPath, folderName, lang);
        break;
      case 'solid':
        await installSolid(targetPath, folderName, lang);
        break;
      case 'svelte':
        await installSvelte(targetPath, folderName, lang);
        break;
      case 'vue':
        await installVue(targetPath, folderName, lang);
        break;
      case 'lit':
        await installLit(targetPath, folderName, lang);
        break;
      case 'astro':
        await installAstro(targetPath, folderName, lang);
        break;
      case 'remix':
        await installRemix(targetPath, folderName, lang);
        break;
      default:
        console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
        console.log(chalk.bold.red('║') + chalk.bold.white(` ❌ Unknown frontend framework: ${framework}`) + chalk.bold.red('                        ║'));
        console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
        return;
    }

    console.log(chalk.bold.green('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.green('║') + chalk.bold.white(' ✅ Frontend setup completed successfully!') + chalk.bold.green('                  ║'));
    console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════╝'));

    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 🎯 Next steps:') + chalk.bold.cyan('                                             ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray(`   1. cd ${folderName}`) + chalk.bold.cyan('                                                ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   2. npm install') + chalk.bold.cyan('                                           ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   3. npm start') + chalk.bold.cyan('                                             ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Error during frontend setup:') + chalk.bold.red('                                ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    process.exit(1);
  }
}
