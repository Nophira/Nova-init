import { askFrontendSetup } from '../functions/frontend.js';
import type { FrontendSetup } from '../../types/index.js';

export async function promptFrontend(hasMonorepo: boolean): Promise<FrontendSetup> {
  return await askFrontendSetup(hasMonorepo);
}

// 🆕 BEISPIEL: Utility Types verwenden
export type PartialFrontendSetup = Partial<FrontendSetup>;
export type RequiredFrontendSetup = Required<Pick<FrontendSetup, 'language' | 'framework'>>;
