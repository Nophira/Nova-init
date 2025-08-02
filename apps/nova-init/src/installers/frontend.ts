import { run } from '../utils/exec';
import { log } from '../utils/logger';

export async function installFrontend(framework: string, { dir, lang, vite }) {
  log.info(`Installing frontend: ${framework} (${lang})`);

  if (framework === 'react') {
    if (vite) {
      await run('npm', ['create', 'vite@latest', dir, '--', '--template', lang === 'ts' ? 'react-ts' : 'react']);
    } else {
      await run('npx', ['create-react-app', dir, '--template', lang === 'ts' ? 'typescript' : 'javascript']);
    }
  }

  if (framework === 'nextjs') {
    await run('npx', ['create-next-app', dir, '--ts']);
  }

  // TODO: Weitere Frameworks
}
