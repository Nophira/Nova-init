import { select, cancel, isCancel } from '@clack/prompts';
import type { Techstack } from '../../types/types.js';

const techstackOptions: { label: string; value: Techstack }[] = [
  { label: 'MERN (Mongo, Express, React, Node)', value: 'mern' },
  { label: 'MEAN (Mongo, Express, Angular, Node)', value: 'mean' },
  { label: 'MEVN (Mongo, Express, Vue, Node)', value: 'mevn' },
  { label: 'MERN with TypeScript', value: 'mern_ts' },
  { label: 'MEAN with TypeScript', value: 'mean_ts' },
  { label: 'MEVN with TypeScript', value: 'mevn_ts' },
  { label: 'None', value: 'none' },
];

export async function promptTechstack(): Promise<Techstack> {
  const selected = await select({
    message: 'Select a techstack:',
    options: techstackOptions,
  });

  if (isCancel(selected)) {
    cancel('Techstack prompt cancelled.');
    process.exit(0);
  }

  return selected;
}
