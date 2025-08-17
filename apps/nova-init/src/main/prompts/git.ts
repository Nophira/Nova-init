import { askGitInitialization } from '../functions/git.js';

export async function promptGit(): Promise<boolean> {
  return await askGitInitialization();
}
