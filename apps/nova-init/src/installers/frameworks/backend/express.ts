import consola from 'consola';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import * as path from 'path';
import type { Language, PackageManager } from '../../../types/index.js';
import { getBackendConfig } from '../../../core/FrameworkConfig.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

export async function installExpress(
  targetPath: string, 
  language: Language = 'javascript',
  packageManager: PackageManager = 'npm'
) {
  try {
    // Get Express configuration
    const config = getBackendConfig('express');
    
    // Validate language support
    if (!config.supportedLanguages.includes(language)) {
      throw new Error(`Express does not support language: ${language}. Supported: ${config.supportedLanguages.join(', ')}`);
    }
    
    // Validate package manager support
    if (!config.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Express does not support package manager: ${packageManager}. Supported: ${config.supportedPackageManagers.join(', ')}`);
    }
    
    consola.info(`📦 Installing Express (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    // Initialize project with package manager
    PackageManagerUtils.initProject(packageManager, targetPath);
    
    // Install main dependencies
    const mainDependencies = config.dependencies?.common || ['express'];
    PackageManagerUtils.installDependencies(packageManager, mainDependencies, targetPath, false);
    
    if (language === 'typescript') {
      consola.info('⚙️ Setting up TypeScript configuration...');
      
      // Install TypeScript dev dependencies
      const tsDevDependencies = config.devDependencies?.typescript || 
        ['typescript', '@types/express', 'ts-node-dev', '@types/node'];
      PackageManagerUtils.installDependencies(packageManager, tsDevDependencies, targetPath, true);
      
      // Initialize TypeScript configuration
      PackageManagerUtils.execCommand('npx tsc --init', targetPath);

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

      // Create src directory and main file
      mkdirSync(path.join(targetPath, 'src'), { recursive: true });
      const mainContent = `import express from 'express';

const app = express();
const PORT = process.env.PORT || ${config.defaultPort};

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express with TypeScript!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
      writeFileSync(path.join(targetPath, 'src/index.ts'), mainContent);

    } else {
      consola.info('⚙️ Setting up JavaScript configuration...');

      // Create src directory and main file
      mkdirSync(path.join(targetPath, 'src'), { recursive: true });
      const mainContent = `import express from 'express';

const app = express();
const PORT = process.env.PORT || ${config.defaultPort};

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express with JavaScript!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
      writeFileSync(path.join(targetPath, 'src/index.js'), mainContent);
    }
    
    // Update package.json with configured scripts
    const packageJsonPath = path.join(targetPath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    
    // Add module type for JavaScript
    if (language === 'javascript') {
      packageJson.type = 'module';
    }
    
    // Use configuration scripts with appropriate file extension
    const fileExt = language === 'typescript' ? 'ts' : 'js';
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: language === 'typescript' ? 
        'ts-node-dev --respawn --transpile-only src/index.ts' : 
        config.scripts.dev.replace('index.js', `src/index.${fileExt}`),
      build: language === 'typescript' ? config.scripts.build : undefined,
      start: language === 'typescript' ? 
        config.scripts.start : 
        config.scripts.start.replace('index.js', `src/index.${fileExt}`)
    };
    
    // Remove undefined scripts
    Object.keys(packageJson.scripts).forEach(key => {
      if (packageJson.scripts[key] === undefined) {
        delete packageJson.scripts[key];
      }
    });
    
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Create environment file
    const envContent = `# Server Configuration
PORT=${config.defaultPort}
NODE_ENV=development
`;
    writeFileSync(path.join(targetPath, '.env.example'), envContent);
    
    consola.success(`✅ Express (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Express:`, error);
    throw error;
  }
}
