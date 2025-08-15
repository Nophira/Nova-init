import type { SetupType } from '../../types/types.js';

type ArgMap = Record<string, string | boolean>;

export function buildSetupType(options: ArgMap): { setupType: SetupType; techStack?: string } {
  const techStack = (options['techstack'] as string) || undefined;
  const st = (options['setup-type'] as string) || undefined;
  const setupType: SetupType = techStack ? 'predefined' : (st === 'predefined' ? 'predefined' : 'custom');
  return { setupType, techStack };
}


