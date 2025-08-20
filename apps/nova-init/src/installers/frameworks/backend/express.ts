import { execSync } from 'child_process';
import consola from 'consola';
import { writeFileSync, readFileSync } from 'fs';
import * as path from 'path';
import type { Language, PackageManager } from '../../../types/index.js';

export async function installExpress(
  targetPath: string, 
  language: Language = 'javascript',
  packageManager: PackageManager = 'npm'
) {
  try {
    consola.info(`🛠 Installing Express (${language}) in "${targetPath}"...`);

    const exec = (cmd: string) =>
      execSync(cmd, { cwd: targetPath, stdio: 'inherit' }); 

    // Install Express
    if (packageManager === 'pnpm') {
      exec('npm init -y');
      exec('pnpm install');
      exec('pnpm add express');
    } else if (packageManager === 'bun') {
      exec('npm init -y');
      exec('bun install');
      exec('bun add express');
    } else {
      exec('npm install express');
    }

    if (language === 'typescript') {
      consola.info('Installing TypeScript dependencies...');
      if (packageManager === 'pnpm') {
        exec('pnpm add -D typescript @types/express ts-node-dev @types/node');
      } else if (packageManager === 'bun') {
        exec('bun add -d typescript @types/express ts-node-dev @types/node');
      } else {
        exec('npm install -D typescript @types/express ts-node-dev @types/node');
      }
      exec('npx tsc --init');

      const tsConfig = {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
      };

      writeFileSync(
        path.join(targetPath, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
      );

      execSync('mkdir -p src', { cwd: targetPath });
      const mainContent = `import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
`;
      writeFileSync(
        path.join(targetPath, 'src/index.ts'),
        mainContent
      );

      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      packageJson.scripts = {
        ...packageJson.scripts,
        "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js"
      };
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    } else {
      consola.info('Installing JavaScript version...');

      execSync('mkdir -p src', { cwd: targetPath });
      const mainContent = `import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
`;
      writeFileSync(
        path.join(targetPath, 'src/index.js'),
        mainContent
      );

      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      packageJson.type = 'module';
      packageJson.scripts = {
        ...packageJson.scripts,
        "dev": "node src/index.js",
        "start": "node src/index.js"
      };
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development
`;

    writeFileSync(
      path.join(targetPath, '.env.example'),
      envContent
    );
    
    consola.success(`✅ Express (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Express:`, error);
    throw error;
  }
}
