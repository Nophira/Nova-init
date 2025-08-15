type ArgMap = Record<string, string | boolean>;

function mapDb(n: string): string {
  const v = n.toLowerCase();
  if (v === 'postgresql') return 'postgres';
  return v;
}

export function buildDatabases(options: ArgMap): string[] {
  const raw = options['databases'];
  if (!raw || typeof raw === 'boolean') return [];
  return raw.split(',').map(s => s.trim()).filter(Boolean).map(mapDb);
}


