import { askBackendSetup } from '../functions/backend.js';
import type { BackendSetup } from '../../types/index.js';

export async function promptBackend(hasMonorepo: boolean): Promise<BackendSetup> {
  return await askBackendSetup(hasMonorepo);
}
