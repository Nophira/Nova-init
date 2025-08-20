#!/usr/bin/env node

import consola from 'consola';
import { printHelp } from './commands/help.js';

async function runSetupInteractive() {
  const { promptSetup } = await import('./main/setup.prompt.js');
  await promptSetup();
}

async function main() {
  const argv = process.argv.slice(2);
  const command = argv[0] || 'setup';

  try {
    switch (command) {
      case 'setup':
        await runSetupInteractive();
        break;
      case '--help':
      case '-h':
      case 'help':
        printHelp();
        break;
      default:
        consola.error(`Unknown command: ${command}`);
        consola.info('Run "nova-init help" for usage information.');
        process.exit(1);
    }
  } catch (error) {
    consola.error('❌ Command failed:', error);
    process.exit(1);
  }
}

main();
