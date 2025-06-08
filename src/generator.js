import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
                      
// Dynamischer Import für Frameworks
const frameworkInstallers = {
  React: async () => (await import('./commands/frameworks/frontend/react/react.js')).installReact,
  Angular: async () => (await import('./commands/frameworks/frontend/angular/angular-ts.js')).installAngular,
  NextJs: async () => (await import('./commands/frameworks/frontend/nextjs/nextjs.js')).installNextJs,
  NuxtJs: async () => (await import('./commands/frameworks/frontend/nuxtjs/nuxtjs.js')).installNuxtJs,
  Preact: async () => (await import('./commands/frameworks/frontend/preact/preact.js')).installPreact,
  Qwik: async () => (await import('./commands/frameworks/frontend/qwik/qwik.js')).installQwik,
  Solid: async () => (await import('./commands/frameworks/frontend/solid/solid.js')).installSolid,
  Svelte: async () => (await import('./commands/frameworks/frontend/svelte/svelte.js')).installSvelte,
  Vue: async () => (await import('./commands/frameworks/frontend/vue/vue.js')).installVue,
  Lit: async () => (await import('./commands/frameworks/frontend/lit/lit.js')).installLit,
  Express: async () => (await import('./commands/frameworks/backend/express/express.js')).installExpress,
  NestJs: async () => (await import('./commands/frameworks/backend/nestjs/nestjs.js')).installNestJs,
  Fastify: async () => (await import('./commands/frameworks/backend/fastify/fastify.js')).installfastify,
};

export async function generateProject(config) {
  const {
    projectName,
    projectType,
    frontendFramework,
    backendFramework,
    frontendLang,
    backendLang,
    useVite,
  } = config;

  const projectRoot = path.join(process.cwd(), projectName);
  
  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║') + chalk.bold.white(` 📁 Creating project: ${projectRoot}`) + chalk.bold.cyan('        ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════════════════════════════════╝'));
  
  fs.mkdirSync(projectRoot, { recursive: true });

  if (projectType === 'fullstack') {
    const frontendPath = path.join(projectRoot, 'frontend');
    const backendPath = path.join(projectRoot, 'backend');

    fs.mkdirSync(frontendPath, { recursive: true });
    fs.mkdirSync(backendPath, { recursive: true });

    if (frontendFramework) {
      const installFrontend = await frameworkInstallers[frontendFramework]();
      console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🎨 Installing ${frontendFramework} (${frontendLang}) in frontend...`) + chalk.bold.cyan('    ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════╝'));
      await installFrontend(frontendPath, projectName, frontendLang, useVite);
    }

    if (backendFramework) {
      const installBackend = await frameworkInstallers[backendFramework]();
      console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🛠 Installing ${backendFramework} (${backendLang}) in backend...`) + chalk.bold.cyan('    ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════╝'));
      await installBackend(backendPath, projectName, backendLang);
    }

  } else {
    const installPath = projectRoot;
    const framework = frontendFramework || backendFramework;
    const lang = frontendLang || backendLang;

    if (framework) {
      const installer = await frameworkInstallers[framework]();
      console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` ⚙️ Installing ${framework} (${lang})...`) + chalk.bold.cyan('                         ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
      await installer(installPath, projectName, lang, useVite);
    }
  }

  console.log(chalk.bold.green('\n╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.green('║') + chalk.bold.white(' ✅ Project setup complete!') + chalk.bold.green('                                 ║'));
  console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════╝'));

  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║') + chalk.bold.white(' 🎯 Next steps:') + chalk.bold.cyan('                                             ║'));
  console.log(chalk.bold.cyan('║') + chalk.gray(`   1. cd ${projectName}`) + chalk.bold.cyan('                                               ║'));
  console.log(chalk.bold.cyan('║') + chalk.gray('   2. npm install') + chalk.bold.cyan('                                           ║'));
  console.log(chalk.bold.cyan('║') + chalk.gray('   3. npm start') + chalk.bold.cyan('                                             ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
}
