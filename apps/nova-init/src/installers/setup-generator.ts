import { promptSetup } from '../prompts/setup.prompt.js';
import { writeNovaInitJson } from '../utils/nova-init-writer.js';
import { generateMonorepo } from '../installers/functions/monorepo.js';
export async function runSetup() {

  const config = await promptSetup();

  if (config.monorepo !== 'none') {
    await generateMonorepo(config);
  }
  

  await writeNovaInitJson(config);



  console.log('Project setup complete!');
}
