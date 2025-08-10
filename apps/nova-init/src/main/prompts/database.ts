import { askDatabases } from '../functions/database.js';

export async function promptDatabases(): Promise<string[]> {
  return await askDatabases();
}
