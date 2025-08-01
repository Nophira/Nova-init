#!/usr/bin/env node

import minimist from 'minimist';
import { askQuestions } from './prompts.js';
import { generateProject } from './generator.js';
import addFrontend from './commands/setup_commands/addFrontend.js';
import addBackend from './commands/setup_commands/addBackend.js';
import addDatabase from './commands/setup_commands/addDatabase.js';
import showHelp from './commands/setup_commands/help.js';
import addTechstack from './commands/setup_commands/addTechstack.js';
import addMonorepo from './commands/setup_commands/addMonorepo.js'

const args = minimist(process.argv.slice(2));
const command = args._[0];

async function handleCustomCommand() {
  if (command === 'add') {
    const type = args._[1];
    if (type === 'frontend') {
      await addFrontend(process.argv.slice(3));
    } else if (type === 'backend') {
      await addBackend(process.argv.slice(3));
    } else if (type === 'database') {
      await addDatabase(process.argv.slice(3));
    } else if (type === 'techstack') {
      await addTechstack(process.argv.slice(3));
    }else if(type === 'monorepo'){
     await addMonorepo(process.argv.slice(3));
    } else {
      console.log('Unknown command type. Use "frontend", "backend", "database", "monorepo" or "techstack"');
    }
  } else if (command === 'help') {
    showHelp();
  } else {
    const config = await askQuestions();
    await generateProject(config);
  }
}

handleCustomCommand().catch(console.error);
