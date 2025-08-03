#!/usr/bin/env node
import { runSetup } from './installers/setup-generator.js';

async function main() {
  try {
    await runSetup();
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

main();
