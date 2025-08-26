import { ProjectManager } from '../core/ProjectManager.js';
import type { ProjectStructure } from '../types/index.js';

export async function runInteractiveSetup(): Promise<void> {
  try {
    console.log('🚀 Willkommen bei Nova-Init!');
    console.log('Lass uns dein Projekt Schritt für Schritt aufsetzen.\n');

    // Vereinfachte Version für den Moment
    const projectName = 'mein-projekt'; // TODO: Implement prompt
    const setupType = 'custom' as const;
    const monorepo = 'none' as const;
    const packageManager = 'npm' as const;
    
    // Einfaches React + Express Setup
    const frontend = {
      language: 'typescript' as const,
      framework: 'react' as const,
      folderName: 'frontend',
      packageManager,
    };
    
    const backend = {
      language: 'typescript' as const,
      framework: 'express' as const,
      useMicroservices: false,
      folderName: 'backend',
      packageManager,
    };
    
    const databases: any[] = [];
    const initializeGit = true;
    
    // Projektstruktur erstellen
    const projectConfig: ProjectStructure = {
      projectName,
      setupType,
      monorepo,
      packageManagers: {
        monorepo: undefined,
        frontend: packageManager,
        backend: packageManager,
      },
      frontend,
      backend,
      databases,
      hosting: 'none',
      initializeGit,
      techStack: undefined,
    };
    
    // Projekt mit ProjectManager erstellen
    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);
    
    console.log('\n✅ Projekt erfolgreich erstellt!');
    console.log(`📁 Projektordner: ${projectName}`);
    console.log('\nNächste Schritte:');
    console.log(`1. cd ${projectName}`);
    console.log('2. npm run dev (oder entsprechender Befehl)');
    
  } catch (error) {
    console.error('❌ Setup fehlgeschlagen:', error);
    throw error;
    console.log('\n💡 Tipp: Verwende den Command-Line Modus für mehr Kontrolle:');
    console.log('npx create-nova-init setup-cli -n mein-projekt -f react -b express -p npm -g');
  }
}
