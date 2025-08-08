import { askProjectName } from '../../installers/functions/projectName.js';

export async function promptProjectName(): Promise<string> {
  return await askProjectName();
}
