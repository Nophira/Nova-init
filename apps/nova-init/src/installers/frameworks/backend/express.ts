import { execSync } from 'child_process';
import consola from 'consola';
import { writeFileSync } from 'fs';
import * as path from 'path';

export async function installExpress(targetPath: string, language: string = 'JavaScript') {
  try {
    consola.info(`🛠 Installing Express (${language}) in "${targetPath}"...`);

    const exec = (cmd: string) =>
      execSync(cmd, { cwd: targetPath, stdio: 'inherit' }); 

    exec(`npm init -y`);
    exec(`npm install express`);

    if (language === 'TypeScript') {
      consola.info('Installing TypeScript dependencies...');
      exec(`npm install -D typescript @types/express ts-node-dev @types/node`);
      exec(`npx tsc --init`);

      const tsCode = `
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => res.send('Hello from Express + TypeScript!'));

app.listen(port, () => {
  console.log(\`🚀 Server ready at http://localhost:\${port}\`);
});
`;
      writeFileSync(path.join(targetPath, 'index.ts'), tsCode.trim());
    } else {
      consola.info('Installing JavaScript version...');
      const jsCode = `
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello from Express!'));
app.listen(port, () => console.log(\`🚀 Server running at http://localhost:\${port}\`));
`;
      writeFileSync(path.join(targetPath, 'index.js'), jsCode.trim());
    }
    
    consola.success(`✅ Express (${language}) installed successfully`);
  } catch (error) {
    consola.error(`❌ Failed to install Express:`, error);
    throw error;
  }
}
