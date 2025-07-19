import minimist from 'minimist';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import { createDockerCompose, getAvailableDatabases } from '../database/docker-compose.js';

export default async function addDatabase(argv) {
  try {
    const args = minimist(argv);
    let database = args.database;
    let folderName = args.folder || 'database';
    let options = {};

    if (!database) {
      // Interaktives Menü
      const availableDatabases = getAvailableDatabases();
      const { selectedDatabase } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedDatabase',
          message: chalk.cyan('Select a database:'),
          choices: availableDatabases.map(db => ({
            name: `${db.name} (${db.description})`,
            value: db.value
          }))
        }
      ]);
      database = selectedDatabase;

      // Dynamische Felder je nach Datenbank
      if (database === 'mongodb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'username', message: 'MongoDB Username:', default: 'admin' },
          { type: 'password', name: 'password', message: 'MongoDB Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 27017 }
        ]);
        options = answers;
      } else if (database === 'postgres') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'port', message: 'Port:', default: 5432 }
        ]);
        options = answers;
      } else if (database === 'mysql') {
        const answers = await inquirer.prompt([
          { type: 'password', name: 'password', message: 'MySQL Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 3306 }
        ]);
        options = answers;
      } else if (database === 'redis') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'port', message: 'Port:', default: 6379 }
        ]);
        options = answers;
      }
    } else {
      // CLI-Parameter auswerten
      if (database === 'mongodb') {
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 27017;
      } else if (database === 'postgres') {
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.db = args.db || 'mydatabase';
        options.port = args.port || 5432;
      } else if (database === 'mysql') {
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.db = args.db || 'mydatabase';
        options.port = args.port || 3306;
      } else if (database === 'redis') {
        options.port = args.port || 6379;
      }
    }

    const targetPath = path.join(process.cwd(), folderName);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }
    await createDockerCompose(targetPath, database, options);
  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Error during database setup:') + chalk.bold.red('                            ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    process.exit(1);
  }
} 