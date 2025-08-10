import { askHosting } from '../functions/hosting.js';

export async function promptHosting(): Promise<'docker' | 'none'> {
  return await askHosting();
}
