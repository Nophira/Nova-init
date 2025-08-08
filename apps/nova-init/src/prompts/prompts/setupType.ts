import { askSetupType } from '../../installers/functions/setupType.js';

export async function promptSetupType(): Promise<'custom' | 'predefined'> {
  return await askSetupType();
}
