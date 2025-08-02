// commands/express.js
import { execSync } from 'child_process';
import chalk from 'chalk';
import { writeFileSync } from 'fs';
import path from 'path';

export function installExpress(targetPath,language = 'JavaScript') {
  console.log(chalk.green(`\n🛠 Installing Express (${language}) in "${targetPath}"...`));

  const exec = (cmd) =>
    execSync(cmd, { cwd: targetPath, stdio: 'inherit', shell: true }); 

  exec(`npm init -y`);
  exec(`npm install express`);

  if (language === 'TypeScript') {
    console.log(chalk.cyan('Installing TypeScript dependencies...'));
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
    console.log(chalk.cyan('Installing JavaScript version...'));
    const jsCode = `
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello from Express!'));
app.listen(port, () => console.log(\`🚀 Server running at http://localhost:\${port}\`));
`;
    writeFileSync(path.join(targetPath, 'index.js'), jsCode.trim());
  }
}
