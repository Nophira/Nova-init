import { Command } from 'commander';
import { handleArgs } from '../flows/handleArgs';
import { addCommand } from '../commands/add';
import { helpCommand } from '../commands/help';

export function runCli() {
  const program = new Command();

  program
    .name('create-nova-init')
    .description('A modern CLI to scaffold project architecture.')
    .version('2.0.0')
    .option('--frontend <name>', 'Frontend framework')
    .option('--backend <name>', 'Backend framework')
    .option('--database <name>', 'Database')
    .option('--monorepo <tool>', 'Monorepo tool')
    .option('--techstack <name>', 'Predefined tech stack')
    .option('--lang <lang>', 'Language (js or ts)', 'ts')
    .option('--vite', 'Use Vite (only for React)')
    .option('--dir <name>', 'Project directory', 'nova-app')
    .action((opts) => {
      handleArgs(opts); 
    });

  program
    .command('add')
    .description('Add a module to your existing project')
    .argument('<type>', 'frontend|backend|database|monorepo')
    .option('--name <name>', 'Name of the module or framework')
    .action((type, options) => {
      addCommand(type, options);
    });

  program
    .command('help')
    .description('Show custom help info')
    .action(() => helpCommand());

  program.parse();
}
