import { askDatabases } from '../../installers/functions/database.js';

export async function promptDatabases(): Promise<string[]> {
  return await askDatabases();
}
