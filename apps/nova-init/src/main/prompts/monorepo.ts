import { askMonorepoTool, askMonorepoPackageManager } from '../functions/monorepo.js';
import { askPackageManager } from '../functions/packageManager.js';
import type { MonorepoTool, PackageManager } from '../../types/types.js';

export async function promptMonorepo(): Promise<MonorepoTool> {
  return await askMonorepoTool();
}

export async function promptMonorepoPackageManager(monorepo: MonorepoTool): Promise<PackageManager> {
  return await askMonorepoPackageManager(monorepo);
}
