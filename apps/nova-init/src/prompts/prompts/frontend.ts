import { select, cancel, isCancel } from '@clack/prompts';
import type { FrontendFramework } from '../../types/types.js';

const frontendOptions: { label: string; value: FrontendFramework }[] = [
  { label: 'React', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt', value: 'nuxtjs' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Astro', value: 'astro' },
  { label: 'Remix', value: 'remix' },
  { label: 'Solid', value: 'solid' },
  { label: 'Qwik', value: 'qwik' },
  { label: 'Preact', value: 'preact' },
  { label: 'Lit', value: 'lit' },
  { label: 'None / Skip', value: 'none' as FrontendFramework },
];

export async function promptFrontend(): Promise<FrontendFramework> {
  const framework = await select({
    message: 'Select a frontend framework:',
    options: frontendOptions,
  });

  if (isCancel(framework)) {
    cancel('Frontend selection cancelled.');
    process.exit(0);
  }

  return framework;
}
