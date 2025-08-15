type ArgMap = Record<string, string | boolean>;

export function buildProjectName(options: ArgMap, positionals: string[]): string {
  const explicit = options['project-name'] as string | undefined;
  if (explicit && explicit.trim()) return explicit.trim();
  const pos = positionals[0];
  if (pos && typeof pos === 'string' && pos.trim()) return pos.trim();
  const cwd = process.cwd();
  const parts = cwd.split('/')
    .filter(Boolean);
  return parts[parts.length - 1] || 'my-project';
}


