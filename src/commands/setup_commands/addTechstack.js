import minimist from 'minimist';
import { generateProject } from '../../generator.js';
import { askQuestions } from '../../prompt.js';
import chalk from 'chalk';

async function addTechstack(rawArgs) {
  const args = minimist(rawArgs);
  const projectName = args.folder;
  const techStackName = args.techstack;
  let config = {};

  if (projectName && techStackName) {
    // Wenn sowohl Projektname als auch Tech Stack Name als Argumente übergeben wurden
    // Hier könnten wir eine Validierung einfügen, ob der Tech Stack existiert
    // Fürs Erste gehen wir davon aus, dass er gültig ist.

    config = {
      projectName: projectName,
      techStack: techStackName,
      // Die anderen Parameter (frontendFramework, backendFramework, etc.) werden in generator.js basierend auf techStack gesetzt.
    };
    console.log(chalk.bold.cyan(`\n🚀 Projekt wird mit ${techStackName} Tech Stack und Projektname ${projectName} generiert...`));
  } else {
    // Wenn Projektname oder Tech Stack Name fehlen, führe die normalen Fragen aus.
    console.log(chalk.bold.cyan('\n🚀 Nova Init CLI - Project Setup (Tech Stack Mode)'));
    console.log(chalk.gray('───────────────────────────────────\n'));

    const fullConfig = await askQuestions();
    if (!fullConfig.techStack || !fullConfig.projectName) {
      console.error(chalk.red('Fehler: Projektname oder Tech Stack nicht ausgewählt. Bitte wählen Sie beides aus oder verwenden Sie ein benutzerdefiniertes Projekt.'));
      return;
    }
    config = fullConfig;
  }

  try {
    await generateProject(config);
  } catch (error) {
    console.error(chalk.red(`Fehler beim Generieren des Projekts: ${error.message}`));
  }
}

export default addTechstack;
