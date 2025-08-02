import { installFrontend } from '../installers/frontend';
import { installBackend } from '../installers/backend';
import { installDatabase } from '../installers/database';
import { installMonorepo } from '../installers/monorepo';
import { log } from '../utils/logger';

export async function handleArgs(options: any) {
  const { frontend, backend, database, monorepo, techstack, dir, lang, vite } = options;

  log.start('Setting up your project...\n');

  if (techstack) {
    log.info(`Installing tech stack: ${techstack}`);
    // await installTechstack(...)
    return;
  }

  if (frontend) await installFrontend(frontend, { dir, lang, vite });
  if (backend) await installBackend(backend, { dir, lang });
  if (database) await installDatabase(database, { dir });
  if (monorepo) await installMonorepo(monorepo, { dir });

  log.success('\n🎉 All done! Happy hacking.');
}
