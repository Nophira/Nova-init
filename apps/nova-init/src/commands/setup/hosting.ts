type ArgMap = Record<string, string | boolean>;

export function buildHosting(options: ArgMap): 'docker' {
  const raw = options['hosting'];
  if (!raw || typeof raw === 'boolean') return 'docker';
  return 'docker';
}


