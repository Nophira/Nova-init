import { confirm, isCancel, cancel } from '@clack/prompts';
import { execSync } from 'child_process';
import path from 'path';

export async function askInstallDependencies(): Promise<boolean> {
  const installDeps = await confirm({
    message: 'Install dependencies?',
  });

  if (isCancel(installDeps)) {
    cancel('Dependency installation selection cancelled.');
    process.exit(0);
  }

  return installDeps as boolean;
}

export async function installDependencies(
  projectPath: string, 
  packageManagers: { monorepo?: string; frontend?: string; backend?: string }
): Promise<void> {
  try {
    // Install monorepo dependencies if applicable
    if (packageManagers.monorepo) {
      await installWithPackageManager(projectPath, packageManagers.monorepo);
    }

    // Install frontend dependencies
    if (packageManagers.frontend) {
      const frontendPath = path.join(projectPath, 'frontend');
      await installWithPackageManager(frontendPath, packageManagers.frontend);
    }

    // Install backend dependencies
    if (packageManagers.backend) {
      const backendPath = path.join(projectPath, 'backend');
      await installWithPackageManager(backendPath, packageManagers.backend);
    }

    // Install microservices dependencies if they exist
    // This would need to be implemented based on the microservice structure

  } catch (error) {
    throw new Error(`Failed to install dependencies: ${error}`);
  }
}

async function installWithPackageManager(projectPath: string, packageManager: string): Promise<void> {
  try {
    const fs = await import('fs/promises');
    await fs.access(projectPath);
  } catch (error) {
    // Directory doesn't exist, skip installation
    return;
  }

  try {
    switch (packageManager) {
      case 'npm':
        execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        break;
      case 'pnpm':
        execSync('pnpm install', { cwd: projectPath, stdio: 'inherit' });
        break;
      case 'bun':
        execSync('bun install', { cwd: projectPath, stdio: 'inherit' });
        break;
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }
  } catch (error) {
    throw new Error(`Failed to install with ${packageManager}: ${error}`);
  }
}

export function validatePackageManager(packageManager: string): string {
  if (!['npm', 'pnpm', 'bun'].includes(packageManager)) {
    throw new Error('Invalid package manager. Must be "npm", "pnpm", or "bun"');
  }
  return packageManager;
}
