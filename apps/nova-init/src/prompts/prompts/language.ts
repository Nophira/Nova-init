
import { select, cancel, isCancel } from '@clack/prompts';
import type { Language } from '../../types/types.js';

const languages: { label: string; value: Language }[] = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'JavaScript', value: 'js' },

];

export async function promptLanguage(): Promise<Language> {
  const response = await select({
    message: 'Select your project language:',
    options: languages,
    initialValue: languages[0].value,
  });

  if (isCancel(response)) {
    cancel('Language selection cancelled.');
    process.exit(0);
  }

  return response;
}
