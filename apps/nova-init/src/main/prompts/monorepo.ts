import { askMonorepo, askMonorepoPackageManager } from '../functions/monorepo.js';
import type { MonorepoTool, PackageManager } from '../../types/index.js';

export async function promptMonorepo(): Promise<MonorepoTool> {
  return await askMonorepo();
}

export async function promptMonorepoPackageManager(monorepo: MonorepoTool): Promise<PackageManager> {
  return await askMonorepoPackageManager(monorepo);
}
