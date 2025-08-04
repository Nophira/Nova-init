import { promptSetup } from '../prompts/setup.prompt.js';
import { writeNovaInitJson } from '../utils/nova-init-writer.js';
import { generateMonorepo } from '../installers/functions/monorepo.js';
import fs from 'fs-extra';

export async function runSetup() {
  const config = await promptSetup();
  const rootFolder = config.paths.root;

  // 1. Root-Ordner sicherstellen
  try {
    await fs.ensureDir(rootFolder);
    console.log(`📁 Root folder "${rootFolder}" created or already exists.`);
  } catch (err) {
    console.error(`❌ Failed to create root folder "${rootFolder}":`, err);
    process.exit(1);
  }

  // 2. Monorepo-Tool installieren
  if (config.monorepo !== 'none') {
    await generateMonorepo(config); // getrenntes Modul
  }

  // 3. Konfiguration speichern
  await writeNovaInitJson(config);
  console.log('✅ Project setup complete!');
}
