import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { createDockerCompose } from './commands/database/docker-compose.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
                      
// Definieren der Konfigurationen für vordefinierte Tech-Stacks
const techStackConfigurations = {
  MERN: {
    projectType: 'techstack',
    frontendFramework: 'React',
    backendFramework: 'Express',
    frontendLang: 'JavaScript',
    backendLang: 'JavaScript',
    useVite: true,
    database: 'mongodb',
  },
  MEAN: {
    projectType: 'techstack',
    frontendFramework: 'Angular',
    backendFramework: 'Express',
    frontendLang: 'TypeScript',
    backendLang: 'JavaScript',
    useVite: false, 
    database: 'mongodb',
  },
  MEVN: {
    projectType: 'techstack',
    frontendFramework: 'Vue',
    backendFramework: 'Express',
    frontendLang: 'JavaScript',
    backendLang: 'JavaScript',
    useVite: true,
    database: 'mongodb',
  },
  MERN_TS: {
    projectType: 'techstack',
    frontendFramework: 'React',
    backendFramework: 'Express',
    frontendLang: 'TypeScript',
    backendLang: 'TypeScript',
    useVite: true,
    database: 'mongodb',
  },
  MEAN_TS: {
    projectType: 'techstack',
    frontendFramework: 'Angular',
    backendFramework: 'Express',
    frontendLang: 'TypeScript',
    backendLang: 'TypeScript',
    useVite: false,
    database: 'mongodb',
  },
  MEVN_TS: {
    projectType: 'techstack',
    frontendFramework: 'Vue',
    backendFramework: 'Express',
    frontendLang: 'TypeScript',
    backendLang: 'TypeScript',
    useVite: true,
    database: 'mongodb',
  },
  // Hier können weitere Tech-Stacks hinzugefügt werden
};

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
  let {
    projectName,
    projectType,
    frontendFramework,
    backendFramework,
    frontendLang,
    backendLang,
    useVite,
    techStack,
    database,
  } = config;

  // Wenn ein Tech-Stack ausgewählt wurde, überschreibe die Konfigurationswerte
  if (techStack) {
    const stackConfig = techStackConfigurations[techStack];
    if (stackConfig) {
      projectType = stackConfig.projectType;
      frontendFramework = stackConfig.frontendFramework;
      backendFramework = stackConfig.backendFramework;
      frontendLang = stackConfig.frontendLang;
      backendLang = stackConfig.backendLang;
      useVite = stackConfig.useVite;
      database = stackConfig.database;

    } else {
      console.error(chalk.red(`Error: Configuration for tech stack '${techStack}' not found.`));
      return;
    }
  }
 
 
  const projectRoot = path.join(process.cwd(), projectName);
  
  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║') + chalk.bold.white(` 📁 Creating project: ${projectRoot}`) + chalk.bold.cyan('        ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════════════════════════════════╝'));
  
  fs.mkdirSync(projectRoot, { recursive: true });
  
  if (projectType === 'techstack') {
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

    
    if (database) {
     
      createDockerCompose(projectRoot, database);
    } else {
      console.log(chalk.bold.red('Fehler: Für diesen Tech-Stack wurde keine Datenbank konfiguriert.'));
    }

  } else if (projectType === 'fullstack') {
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
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` ⚙️ Installing ${framework} (${backendLang || frontendLang})...`) + chalk.bold.cyan('                         ║'));
      console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
      await installer(installPath, projectName, backendLang || frontendLang, useVite);
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
