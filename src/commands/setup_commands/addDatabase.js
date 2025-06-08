import minimist from 'minimist';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { createDockerCompose, getAvailableDatabases } from '../database/docker-compose.js';

export default async function addDatabase(argv) {
  try {
    const args = minimist(argv);
    const database = args.database;
    const folderName = args.folder || 'database';

    console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║') + chalk.bold.white(' 📦 Parsing arguments...') + chalk.bold.cyan('                                    ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝'));
    console.log('Arguments:', args);

    if (!database) {
      console.log(chalk.bold.red('╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Please specify a database using --database') + chalk.bold.red('              ║'));
      console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));

      const availableDatabases = getAvailableDatabases();
      
      console.log(chalk.bold.yellow('\n📚 Available databases:'));
      availableDatabases.forEach(db => {
        console.log(chalk.gray(`  • ${db.name} - ${db.description}`));
      });

      console.log(chalk.bold.yellow('\n⚙️ Optional arguments:'));
      console.log(chalk.cyan('  --folder <name>') + chalk.gray('    Specify custom folder name (default: database)'));

      console.log(chalk.bold.yellow('\n📝 Example:'));
      console.log(chalk.green('  npx nova-init add database --folder db --database postgres'));
      return;
    }

    const targetPath = path.join(process.cwd(), folderName);
    
    if (!fs.existsSync(targetPath)) {
      console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║') + chalk.bold.white(` 📁 Creating directory at ${targetPath}`) + chalk.bold.cyan('     ║'));
      console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════════════════════════════════════════╝'));
      fs.mkdirSync(targetPath, { recursive: true });
    }

    await createDockerCompose(targetPath, database);

  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Error during database setup:') + chalk.bold.red('                            ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    process.exit(1);
  }
} 