import { confirm, isCancel, cancel } from '@clack/prompts';
import { execSync } from 'child_process';
import { access } from 'fs/promises';
import path from 'path';

export async function askGitInitialization(): Promise<boolean> {
  const initializeGit = await confirm({
    message: 'Initialize Git repository?',
  });

  if (isCancel(initializeGit)) {
    cancel('Git initialization selection cancelled.');
    process.exit(0);
  }

  return initializeGit as boolean;
}

export async function initializeGitRepository(projectPath: string): Promise<void> {
  try {
    // Check if git is installed
    execSync('git --version', { stdio: 'ignore' });
  } catch (error) {
    throw new Error('Git is not installed. Please install Git to initialize a repository.');
  }

  try {
    // Check if already a git repository
    await access(path.join(projectPath, '.git'));
    throw new Error('Git repository already exists in this directory.');
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  try {
    // Initialize git repository
    execSync('git init', { cwd: projectPath, stdio: 'ignore' });
    
    // Create .gitignore
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
pnpm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.next/
out/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz



# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`;

    const fs = await import('fs/promises');
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);

    // Add all files
    execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
    
    // Initial commit
    execSync('git commit -m "Initial commit: Project setup with nova-init"', { 
      cwd: projectPath, 
      stdio: 'ignore' 
    });

  } catch (error) {
    throw new Error(`Failed to initialize Git repository: ${error}`);
  }
}

export function validateGitInitialization(initializeGit: boolean): boolean {
  if (typeof initializeGit !== 'boolean') {
    throw new Error('Git initialization must be a boolean value');
  }
  return initializeGit;
}
