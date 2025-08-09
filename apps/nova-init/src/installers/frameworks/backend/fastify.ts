import { execSync } from 'child_process';
import consola from 'consola';
import { writeFileSync } from 'fs';
import * as path from 'path';

export async function installFastify(targetPath: string, language: string = 'JavaScript') {
  try {
    consola.info(`🛠 Installing Fastify (${language}) in "${targetPath}"...`);

    const exec = (cmd: string) =>
      execSync(cmd, { cwd: targetPath, stdio: 'inherit' }); 

    exec(`npm init -y`);
    exec(`npm install fastify`);

    if (language === 'TypeScript') {
      consola.info('Installing TypeScript dependencies...');
      exec(`npm install -D typescript @types/node ts-node-dev`);
      exec(`npx tsc --init`);

      const tsCode = `
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
`;
      writeFileSync(path.join(targetPath, 'index.ts'), tsCode.trim());
    } else {
      consola.info('Installing JavaScript version...');
      const jsCode = `
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
`;
      writeFileSync(path.join(targetPath, 'index.js'), jsCode.trim());
    }
    
    consola.success(`✅ Fastify (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Fastify:`, error);
    throw error;
  }
}
