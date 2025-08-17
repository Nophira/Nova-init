import { askTechStack } from '../functions/techstack.js';
import type { PredefinedTechStack } from '../functions/techstack.js';

export async function promptTechStack(): Promise<PredefinedTechStack> {
  return await askTechStack();
}
