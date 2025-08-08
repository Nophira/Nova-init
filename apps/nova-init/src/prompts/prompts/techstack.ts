import { askTechStack } from '../../installers/functions/techstack.js';

export async function promptTechStack(): Promise<string> {
  return await askTechStack();
}
