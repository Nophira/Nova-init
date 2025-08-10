import { askTechStack } from '../functions/techstack.js';

export async function promptTechStack(): Promise<string> {
  return await askTechStack();
}
