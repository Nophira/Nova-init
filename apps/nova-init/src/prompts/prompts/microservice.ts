import { confirm, text, cancel, isCancel } from '@clack/prompts';
import type { MicroserviceConfig } from '../../types/types.js';

export async function promptMicroservice(): Promise<MicroserviceConfig> {
  const enabled = await confirm({
    message: 'Use microservices architecture?',
  });

  if (!enabled) {
    return {
      enabled: false,
    };
  }

  const servicesInput = await text({
    message: 'Enter microservice names separated by commas (e.g. auth,api,worker):',
    placeholder: 'auth,api,worker',
  });

  if (isCancel(servicesInput)) {
    cancel('Microservice names input cancelled.');
    process.exit(0);
  }

  const services = servicesInput
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    enabled: true,
    services,
  };
}
