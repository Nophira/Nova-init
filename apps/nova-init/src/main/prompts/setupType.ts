import { askSetupType } from '../functions/setupType.js';

export async function promptSetupType(): Promise<'custom' | 'predefined'> {
  return await askSetupType();
}
