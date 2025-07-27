import inquirer from 'inquirer';
import chalk from 'chalk';

const frontendFrameworks = [
  'React',
  'Angular',
  'NextJs',
  'NuxtJs',
  'Preact',
  'Qwik',
  'Solid',
  'Svelte',
  'Vue',
  'Lit',
  'Astro',
  'Remix'
];

const backendFrameworks = ['Express', 'NestJs', 'Fastify'];

const supportsLangChoice = [
  'React',
  'Express',
  'Fastify',
  'Lit',
  'NextJs',
  'Preact',
  'Qwik',
  'Solid',
  'Svelte',
  'Vue'
];

const supportsViteChoice = ['React'];

const requiresVite = [
  'Solid',
  'Svelte',
  'Vue',
  'Lit',
  'Preact',
  'NuxtJs',
  'Qwik',
  'Remix'
];

function needsLangChoice(framework: string) {
  return supportsLangChoice.includes(framework);
}

function needsViteChoice(framework: string) {
  return supportsViteChoice.includes(framework);
}

function requiresViteOnly(framework: string) {
  return requiresVite.includes(framework);
}

function validateProjectName(input: string) {
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    return chalk.red('Projektname darf nicht leer sein.');
  }
  return true;
}

export async function askQuestions() {
  console.log(chalk.bold.cyan('\n🚀 Nova Init CLI - Project Setup'));
  console.log(chalk.gray('───────────────────────────────────\n'));

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: chalk.cyan('📦 Project name:'),
      validate: validateProjectName,
      filter: (input: string) => input.trim(),
    },
  ]);

  const { projectCreationType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectCreationType',
      message: chalk.cyan('Choose project creation type:'),
      choices: ['Custom Project', 'Tech Stack'],
    },
  ]);

  let projectType: string | null = null;
  let frontendFramework: string | null = null;
  let backendFramework: string | null = null;
  let frontendLang = 'JavaScript';
  let backendLang = 'JavaScript';
  let useVite = true;
  let techStack: string | null = null;

  if (projectCreationType === 'Tech Stack') {
    const { selectedTechStack } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTechStack',
        message: chalk.cyan('Select a Tech Stack:'),
        choices: ['MERN', 'MEAN', 'MEVN', 'MERN_TS', 'MEAN_TS', 'MEVN_TS'],
      },
    ]);
    techStack = selectedTechStack;
  } else {
    const { selectedProjectType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedProjectType',
        message: chalk.cyan('📂 Project type:'),
        choices: ['frontend', 'backend', 'fullstack'],
      },
    ]);
    projectType = selectedProjectType;

    if (projectType === 'frontend' || projectType === 'fullstack') {
      const { selectedFrontend } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedFrontend',
          message: chalk.cyan('🎨 Frontend framework:'),
          choices: frontendFrameworks,
        },
      ]);
      frontendFramework = selectedFrontend;

      if (needsLangChoice(frontendFramework)) {
        const { selectedLang } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedLang',
            message: chalk.cyan('💡 Frontend language:'),
            choices: ['JavaScript', 'TypeScript'],
          },
        ]);
        frontendLang = selectedLang;
      }

      if (requiresViteOnly(frontendFramework)) {
        useVite = true;
      } else if (needsViteChoice(frontendFramework)) {
        const { selectedVite } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedVite',
            message: chalk.cyan(`⚡ Use Vite for ${frontendFramework}?`),
            choices: [
              { name: 'Yes', value: true },
              { name: 'No', value: false }
            ],
            default: true,
          },
        ]);
        useVite = selectedVite;
      }
    }

    if (projectType === 'backend' || projectType === 'fullstack') {
      const { selectedBackend } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedBackend',
          message: chalk.cyan('🛠 Backend framework:'),
          choices: backendFrameworks,
        },
      ]);
      backendFramework = selectedBackend;

      if (needsLangChoice(backendFramework)) {
        const { selectedLang } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedLang',
            message: chalk.cyan('💡 Backend language:'),
            choices: ['JavaScript', 'TypeScript'],
          },
        ]);
        backendLang = selectedLang;
      }
    }
  }

  console.log(chalk.gray('\n───────────────────────────────────'));
  console.log(chalk.bold.green('✨ Configuration complete!'));
  console.log(chalk.gray('───────────────────────────────────\n'));

  return {
    projectName,
    projectType,
    frontendFramework,
    backendFramework,
    frontendLang,
    backendLang,
    useVite,
    techStack,
  };
}