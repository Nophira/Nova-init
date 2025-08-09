import consola from 'consola';
import * as path from 'path';
import { installExpress } from './frameworks/backend/express.js';
import { installNestJS } from './frameworks/backend/nestjs.js';
import { installFastify } from './frameworks/backend/fastify.js';

interface BackendOptions {
  framework?: string;
  lang?: string;
  folder?: string;
}

export async function addBackend(options: BackendOptions) {
  const { framework, lang = 'js', folder = 'backend' } = options;

  if (!framework) {
    consola.error('Framework is required. Use --framework <framework>');
    process.exit(1);
  }

  const language = lang === 'ts' ? 'TypeScript' : 'JavaScript';
  const targetPath = path.resolve(process.cwd(), folder);

  consola.info(`🛠 Adding backend: ${framework} (${language}) in ${folder}`);

  try {
    switch (framework.toLowerCase()) {
      case 'express':
        await installExpress(targetPath, language);
        break;
      case 'nestjs':
        await installNestJS(targetPath, language);
        break;
      case 'fastify':
        await installFastify(targetPath, language);
        break;
      default:
        consola.error(`Unknown framework: ${framework}`);
        consola.info('Available frameworks: express, nestjs, fastify');
        process.exit(1);
    }

    consola.success(`✅ Backend ${framework} (${language}) added successfully in ${folder}`);
    consola.info(`📁 Next steps:`);
    consola.info(`   cd ${folder}`);
    consola.info(`   npm install`);
    consola.info(`   npm start`);
  } catch (error) {
    consola.error(`❌ Failed to add backend ${framework}:`, error);
    process.exit(1);
  }
}
