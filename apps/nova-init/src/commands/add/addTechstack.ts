import consola from 'consola';
import * as fs from 'fs/promises';
import path from 'path';
import { generatePredefinedTechStack } from '../../main/setup-generator.js';

export async function addTechstack(options: any): Promise<void> {
  consola.info(`Adding techstack ${options.techstack}`);

  const projectPath = process.cwd();
  const techstackPath = path.join(projectPath, options.folder || 'techstack');

  try {
    await fs.mkdir(techstackPath, { recursive: true });
    consola.success(`Created techstack directory: ${techstackPath}`);

    await generatePredefinedTechStack(options.techstack, projectPath);

    consola.success(`✅ Techstack (${options.techstack}) added successfully`);
  } catch (error) {
    consola.error(`❌ Failed to add techstack: ${error}`);
  }
}
