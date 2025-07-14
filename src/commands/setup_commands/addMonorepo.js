// src/commands/setup_commands/addMonorepo.js
import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export default async function addMonorepo(argv) {
  try {
    const args = minimist(argv);
    const tool = args.tool;
    const folderName = args.folder || 'monorepo';

    console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 📦 Parsing arguments...') + chalk.bold.cyan('                                    ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    console.log('Arguments:', args);

    if (!tool) {
      console.log(chalk.bold.red('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Please specify a monorepo tool using --tool') + chalk.bold.red('    ║'));
      console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));

      console.log(chalk.bold.yellow('\n📚 Available tools:'));
      console.log(chalk.gray('  • lerna'));
      console.log(chalk.gray('  • nx'));
      console.log(chalk.gray('  • turborepo'));

      console.log(chalk.bold.yellow('\n⚙️ Optional arguments:'));
      console.log(chalk.cyan('  --folder <name>') + chalk.gray('    Specify custom folder name (default: monorepo)'));
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
    console.log(chalk.bold.cyan('║') + chalk.bold.white(` 🛠 Installing ${tool}...`) + chalk.bold.cyan('                          ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));

    switch (tool.toLowerCase()) {
      case 'lerna': {
        const { installLerna } = await import('../tools/monorepo/lerna/lerna.js');
        await installLerna(targetPath, folderName);
        break;
      }
      case 'nx': {
        const { installNx } = await import('../tools/monorepo/nx/nx.js');
        await installNx(targetPath, folderName);
        break;
      }
      case 'turborepo': {
        const { installTurbo } = await import('../tools/monorepo/turborepo/turborepo.js');
        await installTurbo(targetPath, folderName);
        break;
      }
      default:
        console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
        console.log(chalk.bold.red('║') + chalk.bold.white(` ❌ Unknown monorepo tool: ${tool}`) + chalk.bold.red('                        ║'));
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
