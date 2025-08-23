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
    
    // Hier würde normalerweise der interaktive Prompt-Code stehen
    // Da wir uns auf die Command-Line-Version konzentrieren, 
    // zeigen wir eine Nachricht und starten den Command-Line-Modus
    
    consola.info('📝 Interaktiver Modus wird noch implementiert...');
    consola.info('💡 Verwende stattdessen: npx create-nova-init setup-cli --help');
    
    // Für jetzt starten wir mit Standardwerten
    const defaultConfig: ProjectStructure = {
      projectName: 'nova-project',
      setupType: 'custom',
      monorepo: 'none',
      packageManagers: {},
      databases: [],
      hosting: 'none',
      initializeGit: true
    };
    
    const projectManager = new ProjectManager();
    await projectManager.createProject(defaultConfig);
    
    consola.success('✅ Projekt erfolgreich erstellt!');
    
  } catch (error) {
    consola.error('❌ Interaktiver Setup fehlgeschlagen:', error);
    throw error;
  }
}
