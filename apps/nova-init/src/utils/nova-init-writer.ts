import fs from 'fs-extra';
import * as path from 'path';

export async function writeNovaInitJson(config: any) {
  // config.paths.root should be the absolute or relative path to the monorepo root
  const rootFolder = config.paths.root;

  try {
    await fs.ensureDir(rootFolder);
    const filePath = path.join(rootFolder, 'nova-init.json');
    await fs.writeJson(filePath, config, { spaces: 2 });
    console.log(`nova-init.json has been saved in the folder ${rootFolder}.`);
  } catch (error) {
    console.error('Error saving nova-init.json:', error);
  }
}
