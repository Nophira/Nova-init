import { select, text, confirm, isCancel, cancel } from '@clack/prompts';
import type { HostingOption } from '../../types/index.js';

export async function askHostingOption(): Promise<HostingOption> {
  const hosting = await select({
    message: 'Choose hosting option:',
    options: [
      { value: 'none', label: 'No hosting - Local development only' },
      { value: 'docker', label: 'Docker - Containerized hosting' }
    ],
  });

  if (isCancel(hosting)) {
    cancel('Hosting selection cancelled.');
    process.exit(0);
  }

  return hosting as HostingOption;
}

export async function askDockerConfiguration(): Promise<{
  frontendContainer: string;
  frontendPort: number;
  backendContainer?: string;
  backendPort?: number;
  microserviceContainers?: string[];
  microservicePorts?: number[];
}> {
  const config: any = {};

  // Frontend container name
  const frontendContainer = await text({
    message: 'Frontend container name:',
    placeholder: 'frontend-app',
    defaultValue: 'frontend-app',
  });

  if (isCancel(frontendContainer)) {
    cancel('Frontend container name input cancelled.');
    process.exit(0);
  }

  config.frontendContainer = frontendContainer?.trim() || 'frontend-app';

  // Frontend port
  const frontendPort = await text({
    message: 'Frontend port:',
    placeholder: '3000',
    defaultValue: '3000',
  });

  if (isCancel(frontendPort)) {
    cancel('Frontend port input cancelled.');
    process.exit(0);
  }

  config.frontendPort = parseInt(frontendPort?.trim() || '3000', 10);

  // Ask if backend exists
  const hasBackend = await confirm({
    message: 'Do you have a backend to host?',
  });

  if (isCancel(hasBackend)) {
    cancel('Backend hosting selection cancelled.');
    process.exit(0);
  }

  if (hasBackend) {
    // Backend container name
    const backendContainer = await text({
      message: 'Backend container name:',
      placeholder: 'backend-api',
      defaultValue: 'backend-api',
    });

    if (isCancel(backendContainer)) {
      cancel('Backend container name input cancelled.');
      process.exit(0);
    }

    config.backendContainer = backendContainer?.trim() || 'backend-api';

    // Backend port
    const backendPort = await text({
      message: 'Backend port:',
      placeholder: '5000',
      defaultValue: '5000',
    });

    if (isCancel(backendPort)) {
      cancel('Backend port input cancelled.');
      process.exit(0);
    }

    config.backendPort = parseInt(backendPort?.trim() || '5000', 10);

    // Ask if microservices exist
    const hasMicroservices = await confirm({
      message: 'Do you have microservices to host?',
    });

    if (isCancel(hasMicroservices)) {
      cancel('Microservices hosting selection cancelled.');
      process.exit(0);
    }

    if (hasMicroservices) {
      const microserviceNames = await text({
        message: 'Enter microservice names (comma-separated):',
        placeholder: 'auth-service,user-service,product-service',
      });

      if (isCancel(microserviceNames)) {
        cancel('Microservice names input cancelled.');
        process.exit(0);
      }

      if (microserviceNames && microserviceNames.trim()) {
        config.microserviceContainers = microserviceNames.split(',').map(name => name.trim());
        
        // Ask for ports for each microservice
        const microservicePorts: number[] = [];
        for (const service of config.microserviceContainers) {
          const port = await text({
            message: `Port for ${service}:`,
            placeholder: '5001',
            defaultValue: '5001',
          });

          if (isCancel(port)) {
            cancel('Microservice port input cancelled.');
            process.exit(0);
          }

          microservicePorts.push(parseInt(port?.trim() || '5001', 10));
        }
        
        config.microservicePorts = microservicePorts;
      }
    }
  }

  return config;
}

export async function askHostingSetup(): Promise<HostingOption | {
  type: 'docker';
  config: any;
}> {
  const hosting = await askHostingOption();
  
  if (hosting === 'docker') {
    const config = await askDockerConfiguration();
    return { type: 'docker', config };
  }
  
  return hosting;
}

export function validateHostingOption(hosting: string): HostingOption {
  if (!['none', 'docker'].includes(hosting)) {
    throw new Error('Invalid hosting option. Must be "none" or "docker"');
  }
  return hosting as HostingOption;
}

export function validatePort(port: number): number {
  if (port < 1 || port > 65535) {
    throw new Error('Port must be between 1 and 65535');
  }
  return port;
}
