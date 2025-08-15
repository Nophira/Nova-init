type ArgMap = Record<string, string | boolean>;

export function buildHosting(options: ArgMap): 'docker' | 'none' {
  const raw = options['hosting'];
  if (!raw || typeof raw === 'boolean') return 'none';
  const v = (raw as string).toLowerCase();
  return v === 'docker' ? 'docker' : 'none';
}


