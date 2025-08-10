import { askProjectName } from '../functions/projectName.js';

export async function promptProjectName(): Promise<string> {
  return await askProjectName();
}
