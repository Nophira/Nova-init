import { askInitializeGit } from '../../installers/functions/git.js';

export async function promptGit(): Promise<boolean> {
  return await askInitializeGit();
}
