import { select, isCancel, cancel } from '@clack/prompts';

const techStackOptions = [
  { value: 'MERN', label: 'MERN (MongoDB, Express, React, Node.js - JavaScript)' },
  { value: 'MEAN', label: 'MEAN (MongoDB, Express, Angular, Node.js - JavaScript)' },
  { value: 'MEVN', label: 'MEVN (MongoDB, Express, Vue, Node.js - JavaScript)' },
  { value: 'MERN_TS', label: 'MERN_TS (MongoDB, Express, React, Node.js - TypeScript)' },
  { value: 'MEAN_TS', label: 'MEAN_TS (MongoDB, Express, Angular, Node.js - TypeScript)' },
  { value: 'MEVN_TS', label: 'MEVN_TS (MongoDB, Express, Vue, Node.js - TypeScript)' },
];

export async function askTechStack(): Promise<string> {
  const techStack = await select({
    message: 'Select tech stack:',
    options: techStackOptions,
  });

  if (isCancel(techStack)) {
    cancel('Tech stack selection cancelled.');
    process.exit(0);
  }

  return techStack as string;
}
