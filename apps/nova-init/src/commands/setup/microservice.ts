type ArgMap = Record<string, string | boolean>;

export function buildMicroservices(options: ArgMap): { useMicroservices: boolean; microserviceNames?: string[] } {
  const raw = options['microservices'];
  const list = typeof raw === 'string'
    ? raw.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const use = (raw === true || raw === 'true') || list.length > 0;
  return { useMicroservices: use, microserviceNames: list.length ? list : undefined };
}


