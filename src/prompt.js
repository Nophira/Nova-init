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
  'Lit'
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
  'Qwik'
];

function needsLangChoice(framework) {
  return supportsLangChoice.includes(framework);
}

function needsViteChoice(framework) {
  return supportsViteChoice.includes(framework);
}

function requiresViteOnly(framework) {
  return requiresVite.includes(framework);
}

function validateProjectName(input) {

  const trimmedInput = input.trim();
  
  if (!trimmedInput) {
    return chalk.red('Projektname darf nicht leer sein.');
  }
  
  // Prüfe auf ungültige Zeichen - Deaktiviert, um alle Zeichen zu erlauben
  // if (!/^[a-z0-9-]+$/i.test(trimmedInput)) {
  //   return chalk.red('Projektname darf nur Buchstaben, Zahlen und Bindestriche enthalten.');
  // }
  
  // Prüfe auf führende/nachfolgende Bindestriche - Deaktiviert, um alle Zeichen zu erlauben
  // if (trimmedInput.startsWith('-') || trimmedInput.endsWith('-')) {
  //   return chalk.red('Projektname darf nicht mit einem Bindestrich beginnen oder enden.');
  // }
  
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
      filter: input => input.trim(), // Entferne Leerzeichen automatisch
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

  let projectType = null;
  let frontendFramework = null;
  let backendFramework = null;
  let frontendLang = 'JavaScript';
  let backendLang = 'JavaScript';
  let useVite = true;
  let techStack = null;

  if (projectCreationType === 'Tech Stack') {
    const { selectedTechStack } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTechStack',
        message: chalk.cyan('Select a Tech Stack:'),
        choices: ['MERN', 'MEAN', 'MEVN', 'MERN_TS', 'MEAN_TS', 'MEVN_TS'], // Add more here as they are implemented
      },
    ]);
    techStack = selectedTechStack;
    // Set projectType, frontendFramework, backendFramework, etc. based on the selected techStack
    // This will be handled in generator.js, so we just pass the techStack for now.
  } else { // Custom Project
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
    projectType, // This will be null if a techStack is chosen
    frontendFramework, // This will be null if a techStack is chosen
    backendFramework, // This will be null if a techStack is chosen
    frontendLang, // This will be 'JavaScript' if a techStack is chosen (or its default)
    backendLang, // This will be 'JavaScript' if a techStack is chosen (or its default)
    useVite, // This will be true if a techStack is chosen (or its default)
    techStack, // This will be null if a custom project is chosen
  };
}
