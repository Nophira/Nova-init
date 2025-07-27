import { Command } from 'commander';
import { runInit } from '@nova/commands';
import { askQuestions } from '@nova/prompts';

const program = new Command();
program
    .name('nova-init')
    .description('Initialize a new project');


program
 .command('init')
 .description('create a new project')
 .action(runInit());



 program.parse();