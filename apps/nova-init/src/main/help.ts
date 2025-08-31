import { Command } from 'commander';

export function createHelpCommand(): Command {
  const helpCommand = new Command('help');
  helpCommand.description('Show detailed help for all commands');
  helpCommand.action(() => {
    console.log('🚀 Nova-Init CLI - A modern CLI tool for scaffolding your next project\n');

    console.log('📋 Available Commands:');
    (helpCommand.parent as Command).commands.forEach(cmd => {
      if (cmd.name() !== 'help') {
        console.log(`  ${cmd.name()} - ${cmd.description()}`);
      }
    });
    console.log('  help - Show this help message\n');

    console.log('💡 Quick Start:');
    console.log('  npx create-nova-init                     # Interactive mode');
    console.log('  npx create-nova-init setup-cli -n my-project  # Command-line mode');
    

    console.log('🔧 Configuration Management:');
    console.log('  npx create-nova-init config --show            # Show current config');
    console.log('  npx create-nova-init config --backup          # Create backup');
    console.log('  npx create-nova-init info                     # Show project info\n');

    console.log('📚 For more information, visit: https://github.com/Nophira/Nova-init');
  });
  return helpCommand;
}