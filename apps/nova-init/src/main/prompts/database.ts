import { askDatabases } from '../functions/database.js';
import type { DatabaseSetup } from '../../types/index.js';

export async function promptDatabases(): Promise<DatabaseSetup[]> {
  return await askDatabases();
}
