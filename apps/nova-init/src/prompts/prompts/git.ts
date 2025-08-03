import { confirm, text, cancel, isCancel } from '@clack/prompts';
import type { GitConfig } from '../../types/types.js';

export async function promptGit(): Promise<GitConfig> {
  const init = await confirm({
    message: 'Initialize a git repository?',
  });

  if (isCancel(init)) {
    cancel('Git initialization cancelled.');
    process.exit(0);
  }

  let remoteUrl: string | undefined;

  if (init) {
    const url = await text({
      message: 'Enter remote repository URL (optional):',
      placeholder: 'https://github.com/user/repo.git',
    });

    if (isCancel(url)) {
      cancel('Git remote URL input cancelled.');
      process.exit(0);
    }

    remoteUrl = url.trim() || undefined;
  }

  return {
    init,
    remoteUrl,
  };
}
