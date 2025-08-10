#!/usr/bin/env node
import { setupCommand } from './commands/setup-commands.js';
import { addCommand } from './commands/add.js';
import { helpCommand } from './commands/help.js';
import consola from 'consola';

async function main() {
  const args = process.argv.slice(2);
  
  // If no arguments, show help
  if (args.length === 0) {
    helpCommand();
    return;
  }

  // Parse command
  const command = args[0];
  
  switch (command) {
    case 'add':
      await addCommand(args.slice(1));
      break;
    case 'setup':
      await setupCommand(args.slice(1));
      break;
    case 'help':
    case '--help':
    case '-h':
      helpCommand();
      break;
    default:
      consola.error(`Unknown command: ${command}`);
      consola.info('Use "nova-init help" for available commands');
      process.exit(1);
  }
}

main();
