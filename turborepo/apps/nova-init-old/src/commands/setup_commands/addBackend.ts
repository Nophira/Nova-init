// src/commands/setup_commands/addBackend.js
import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { installExpress } from '../frameworks/backend/express/express.js';
import { installNestJs } from '../frameworks/backend/nestjs/nestjs.js';
import { installfastify } from '../frameworks/backend/fastify/fastify.js';

export default async function addBackend(argv) {
  try {
    const args = minimist(argv);
    const framework = args.framework;
    const lang = args.lang || 'JavaScript';
    const folderName = args.folder || 'backend';

    console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 📦 Parsing arguments...') + chalk.bold.cyan('                                    ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    console.log('Arguments:', args);

    if (!framework) {
      console.log(chalk.bold.red('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Please specify a backend framework using --framework') + chalk.bold.red('    ║'));
      console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));

      console.log(chalk.bold.yellow('\n📚 Available frameworks:'));
      console.log(chalk.gray('  • Express (JavaScript/TypeScript)'));
      console.log(chalk.gray('  • NestJS (TypeScript only)'));
      console.log(chalk.gray('  • Fastify (JavaScript/TypeScript)'));

      console.log(chalk.bold.yellow('\n⚙️ Optional arguments:'));
      console.log(chalk.cyan('  --folder <name>') + chalk.gray('    Specify custom folder name (default: backend)'));
      console.log(chalk.cyan('  --lang <language>') + chalk.gray('  Specify language (JavaScript/TypeScript)'));

      console.log(chalk.bold.yellow('\n📝 Example:'));
      console.log(chalk.green('  npx nova-init add backend --folder my-api --framework express --lang TypeScript'));
      return;
    }

    const targetPath = path.join(process.cwd(), folderName);
    
    if (!fs.existsSync(targetPath)) {
      console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` 📁 Creating directory at ${targetPath}`) + chalk.bold.cyan('    ║'));
      console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════════════════════════════════════════╝'));
      fs.mkdirSync(targetPath, { recursive: true });
    }

    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🛠 Installing ${framework} (${lang})...`) + chalk.bold.cyan('                       ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

    switch (framework.toLowerCase()) {
      case 'express':
        await installExpress(targetPath, folderName, lang);
        break;
      case 'nestjs':
        await installNestJs(targetPath, folderName);
        break;
      case 'fastify':
        await installfastify(targetPath, folderName, lang);
        break;
      default:
        console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
        console.log(chalk.bold.red('║') + chalk.bold.white(` ❌ Unknown backend framework: ${framework}`) + chalk.bold.red('                       ║'));
        console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
        return;
    }

    console.log(chalk.bold.green('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.green('║') + chalk.bold.white(' ✅ Backend setup completed successfully!') + chalk.bold.green('                   ║'));
    console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════╝'));

    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 🎯 Next steps:') + chalk.bold.cyan('                                             ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray(`   1. cd ${folderName}`) + chalk.bold.cyan('                                                ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   2. npm install') + chalk.bold.cyan('                                           ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   3. npm start') + chalk.bold.cyan('                                             ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Error during backend setup:') + chalk.bold.red('                                ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    process.exit(1);
  }
}
