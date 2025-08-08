import { askHosting } from '../../installers/functions/hosting.js';

export async function promptHosting(): Promise<'docker' | 'none'> {
  return await askHosting();
}
