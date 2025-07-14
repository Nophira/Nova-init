// src/commands/setup_commands/addFrontend.js
import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { installLerna } from '../tools/monorepo/lerna/lerna';
import { installNx } from '../tools/monorepo/nx/nx';
import { installTurbo } from '../tools/monorepo/turborepo/turborepo';



export default async function addMonorepo(argv) {
  try {
    const args = minimist(argv);
    const monorepo = args.monorepo;
    const folderName = args.folder || 'Monorepo';

    console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 📦 Parsing arguments...') + chalk.bold.cyan('                                    ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    console.log('Arguments:', args);

    if (!monorepo) {
      console.log(chalk.bold.red('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Please specify a Monorepo framework using --monorepo') + chalk.bold.red('    ║'));
      console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));

      console.log(chalk.bold.yellow('\n📚 Available frameworks:'));
      console.log(chalk.gray('  • Lerna '));
      console.log(chalk.gray('  • Nx '));
      console.log(chalk.gray('  • Turborepo'));



      console.log(chalk.bold.yellow('\n⚙️ Optional arguments:'));
      console.log(chalk.cyan('  --folder <name>') + chalk.gray('    Specify custom folder name (default: Monorepo)'));
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
    console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🎨 Installing ${monorepo}...`) + chalk.bold.cyan('                          ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    
   

    switch (framework.toLowerCase()) {
      case 'learn':
        await installLerna(targetPath, folderName,);
        break;
      case 'nx':
        await installNx(targetPath, folderName);
        break;
      case 'turborepo':
        await installTurbo(targetPath, folderName);
        break;  
      default:
        console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
        console.log(chalk.bold.red('║') + chalk.bold.white(` ❌ Unknown Monorepo framework: ${monorepo}`) + chalk.bold.red('                        ║'));
        console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
        return;
    }

    console.log(chalk.bold.green('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.green('║') + chalk.bold.white(' ✅ Monorepo setup completed successfully!') + chalk.bold.green('                  ║'));
    console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════╝'));

    console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 🎯 Next steps:') + chalk.bold.cyan('                                             ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray(`   1. cd ${folderName}`) + chalk.bold.cyan('                                                ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   2. npm install') + chalk.bold.cyan('                                           ║'));
    console.log(chalk.bold.cyan('║') + chalk.gray('   3. npm start') + chalk.bold.cyan('                                             ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Error during Monorepo setup:') + chalk.bold.red('                                ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    process.exit(1);
  }
}
