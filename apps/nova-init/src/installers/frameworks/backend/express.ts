import { execSync } from 'child_process';
import consola from 'consola';
import { writeFileSync } from 'fs';
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

    // Initialize package.json
    exec(`${packageManager} init -y`);
    
    // Install Express
    exec(`${packageManager} add express`);

    if (language === 'typescript') {
      consola.info('Installing TypeScript dependencies...');
      exec(`${packageManager} add -D typescript @types/express ts-node-dev @types/node`);
      exec(`npx tsc --init`);

      // Create TypeScript configuration
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

      // Create source directory and main file
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

      // Update package.json scripts
      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = JSON.parse(require('fs').readFileSync(packageJsonPath, 'utf8'));
      
      packageJson.scripts = {
        ...packageJson.scripts,
        "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js"
      };

      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    } else {
      consola.info('Installing JavaScript version...');
      
      // Create source directory and main file
      execSync('mkdir -p src', { cwd: targetPath });
      
      const mainContent = `const express = require('express');

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

      // Update package.json scripts
      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = JSON.parse(require('fs').readFileSync(packageJsonPath, 'utf8'));
      
      packageJson.scripts = {
        ...packageJson.scripts,
        "dev": "node src/index.js",
        "start": "node src/index.js"
      };

      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    // Create .env.example
    const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (if applicable)
# DATABASE_URL=mongodb://localhost:27017/your-database
# REDIS_URL=redis://localhost:6379

# JWT Configuration (if applicable)
# JWT_SECRET=your-secret-key
# JWT_EXPIRES_IN=24h
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
