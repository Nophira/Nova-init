import { askHostingSetup } from '../functions/hosting.js';
import type { HostingOption } from '../../types/index.js';

export async function promptHosting(): Promise<HostingOption | { type: 'docker'; config: any }> {
  return await askHostingSetup();
}
