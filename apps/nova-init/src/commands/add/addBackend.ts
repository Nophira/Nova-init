import consola from 'consola';
import * as fs from 'fs/promises';
import path from 'path';
import { installExpress } from './../../installers/frameworks/backend/express.js';
import { installNestJS } from './../../installers/frameworks/backend/nestjs.js';
import { installFastify } from './../../installers/frameworks/backend/fastify.js';

export async function addBackend(options: any): Promise<void> {
  consola.info(`Adding backend with framework ${options.framework} and language ${options.lang}`);

  const projectPath = process.cwd();
  const backendPath = path.join(projectPath, options.folder || 'backend');

  try {
    await fs.mkdir(backendPath, { recursive: true });
    consola.success(`Created backend directory: ${backendPath}`);

    const languageFlag = options.lang === 'typescript' ? 'typescript' : 'javascript';

    switch (options.framework) {
      case 'express':
        await installExpress(backendPath, languageFlag);
        break;
      case 'nestjs':
        await installNestJS(backendPath, languageFlag);
        break;
      case 'fastify':
        await installFastify(backendPath, languageFlag);
        break;
      default:
        consola.warn(`⚠️ Unknown backend framework: ${options.framework}`);
    }

    consola.success(`✅ Backend (${options.framework}) created successfully`);
  } catch (error) {
    consola.error(`❌ Failed to add backend: ${error}`);
  }
}
