
import { confirm, text, isCancel, cancel } from '@clack/prompts';

export async function askUseMicroservices(): Promise<boolean> {
  const useMs = await confirm({
    message: 'Do you want to use Microservices?',
  });

  if (isCancel(useMs)) {
    cancel('Microservice selection cancelled.');
    process.exit(0);
  }

  return Boolean(useMs);
}

export async function askMicroserviceNames(): Promise<string[]> {
  const names = await text({
    message: 'Enter the names of your services (comma separated):',
    placeholder: 'users, orders, auth',
  });

  if (isCancel(names)) {
    cancel('Microservice naming cancelled.');
    process.exit(0);
  }

  return names
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
}
