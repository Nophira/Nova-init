import { confirm, cancel, isCancel } from '@clack/prompts';
import type { DockerConfig } from '../../types/types.js';

export async function promptDocker(): Promise<DockerConfig> {
  const enabled = await confirm({
    message: 'Include Docker setup?',
  });

  if (isCancel(enabled)) {
    cancel('Docker prompt cancelled.');
    process.exit(0);
  }

  return {
    enabled,
  };
}
