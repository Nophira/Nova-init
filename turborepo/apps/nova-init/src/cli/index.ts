import { Command } from 'commander';
import { addCommand } from '../commands/add.js';
import { showHelp } from '../commands/help.js';

const program = new Command();

export function runCli() {
  program
    .name('create-nova-init')
    .description('A modern CLI for scaffolding projects')
    .version('2.0.0')
    .option('--framework <name>', 'Frontend/Backend Framework')
    .option('--lang <ts|js>', 'Programming Language')
    .option('--vite', 'Use Vite')
    .option('--database <name>', 'Database selection')
    .option('--tool <name>', 'Monorepo tool')
    .option('--folder <name>', 'Custom folder name')
    .option('--techstack <name>', 'Predefined tech stack');

  // Nur zwei Subcommands
  program
    .command('add')
    .description('Add frontend/backend/database/monorepo/techstack')
    .action(() => {
      addCommand(program.opts());
    });

  program
    .command('help')
    .description('Show help and examples')
    .action(() => {
      showHelp();
    });

  program.parse();
}
