// ============================================================================
// INTERACTIVE SETUP PROMPT - Interaktiver Setup-Modus
// ============================================================================

import { consola } from 'consola';
import { ProjectManager } from '../core/ProjectManager.js';
import type { ProjectStructure } from '../types/index.js';

/**
 * Interaktiver Setup-Modus mit Prompts
 */
export async function setupPrompt(): Promise<void> {
  try {
    consola.info('🎯 Interaktiver Setup-Modus gestartet...');
    
    // Einfache interaktive Implementierung
    const projectName = await promptProjectName();
    const techStack = await promptTechStack();
    
    let projectConfig: ProjectStructure;
    
    if (techStack) {
      // Verwende vordefinierten Techstack
      const { TechstackManager } = await import('../core/TechstackManager.js');
      projectConfig = TechstackManager.createProjectFromTechStack(techStack, projectName);
    } else {
      // Custom Setup
      projectConfig = await promptCustomSetup(projectName);
    }
    
    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);
    
    consola.success('✅ Projekt erfolgreich erstellt!');
    consola.info(`📁 Projektordner: ${projectName}`);
    consola.info('\nNächste Schritte:');
    consola.info(`1. cd ${projectName}`);
    consola.info('2. npm run dev (oder entsprechender Befehl)');
    
  } catch (error) {
    consola.error('❌ Interaktiver Setup fehlgeschlagen:', error);
    throw error;
  }
}

async function promptProjectName(): Promise<string> {
  // Für jetzt verwenden wir einen Standard-Namen
  // In einer echten Implementierung würden wir hier einen Prompt anzeigen
  return 'nova-project';
}

async function promptTechStack(): Promise<string | null> {
  // Für jetzt verwenden wir null (Custom Setup)
  // In einer echten Implementierung würden wir hier einen Prompt anzeigen
  return null;
}

async function promptCustomSetup(projectName: string): Promise<ProjectStructure> {
  // Standard Custom Setup
  return {
    projectName,
    setupType: 'custom',
    monorepo: 'none',
    packageManagers: {},
    databases: [],
    hosting: 'none',
    initializeGit: true
  };
}
