type ArgMap = Record<string, string | boolean>;

export function buildGit(options: ArgMap): boolean {
  return options['git'] === true;
}


