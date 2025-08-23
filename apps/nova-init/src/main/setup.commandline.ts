import { ProjectManager } from '../core/ProjectManager.js';
import { TechstackManager } from '../core/TechstackManager.js';
import type { ProjectStructure, SetupCommandOptions, DatabaseType } from '../types/index.js';

export async function setupCommandLine(options: SetupCommandOptions): Promise<void> {
  try {
    console.log('🚀 Erstelle Projekt mit Command-Line Parametern...');
    console.log('📋 Empfangene Optionen:', JSON.stringify(options, null, 2));
    
    // Validiere erforderliche Optionen
    if (!options.projectName) {
      throw new Error('Project name is required. Use --project-name <name>');
    }

    const projectName = options.projectName;
    
    let projectConfig: ProjectStructure;
    
    // Prüfe ob ein Techstack verwendet werden soll
    if (options.techstack) {
      console.log(`🎯 Verwende vordefinierten Techstack: ${options.techstack}`);
      projectConfig = TechstackManager.createProjectFromTechStack(options.techstack, projectName!);
    } else {
      // Custom Setup
      // Datenbanken aus den Optionen extrahieren
      const selectedDatabases = options.databases ? 
        (options.databases as string).split(',').map(db => ({
          type: db.trim() as DatabaseType,
          name: db.trim(),
          port: getDefaultDbPort(db.trim()),
          containerName: `${db.trim()}_db`,
          networkName: 'local_dbs_network',
          volumeName: `${db.trim()}_data`,
        })) : [];
      
      // Standardwerte setzen
      projectConfig = {
        projectName: projectName!,
        setupType: options.setupType || 'custom',
        monorepo: (options.monorepo as any) || 'none',
        packageManagers: {
          monorepo: options.monorepoPackageManager,
          frontend: options.frontendPackageManager || options.packageManager || 'npm',
          backend: options.backendPackageManager || options.packageManager || 'npm',
        },
        frontend: options.frontend ? {
          language: options.frontendLanguage || 'typescript',
          framework: options.frontend as any,
          folderName: options.frontendFolder || 'frontend',
          packageManager: options.frontendPackageManager || options.packageManager || 'npm',
        } : undefined,
        backend: options.backend ? {
          language: options.backendLanguage || 'typescript',
          framework: options.backend as any,
          useMicroservices: Boolean(options.microservices),
          microserviceNames: typeof options.microservices === 'string' 
            ? (options.microservices as string).split(',').map((s: string) => s.trim()).filter(Boolean)
            : undefined,
          folderName: options.backendFolder || 'backend',
          packageManager: options.backendPackageManager || options.packageManager || 'npm',
        } : undefined,
        databases: selectedDatabases,
        hosting: 'none', // Hosting entfernt wie in aufgaben.txt
        initializeGit: Boolean(options.git),
        techStack: options.techstack,
      };
    }
    
    // Projekt mit ProjectManager erstellen
    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);
    
    console.log('\n✅ Projekt erfolgreich erstellt!');
    console.log(`📁 Projektordner: ${projectName}`);
    console.log('\nNächste Schritte:');
    console.log(`1. cd ${projectName}`);
    console.log('2. npm run dev (oder entsprechender Befehl)');
    
  } catch (error) {
    console.error('❌ Command-Line Setup fehlgeschlagen:', error);
    throw error;
  }
}

function getDefaultDbPort(db: string): number {
  const mapping: Record<string, number> = {
    postgres: 5432,
    mysql: 3306,
    mariadb: 3306,
    mongodb: 27017,
    redis: 6379,
    cassandra: 9042,
    cockroachdb: 26257,
    couchdb: 5984,
    edgedb: 5656,
    neo4j: 7687,
    surrealdb: 8000,
    yugabytedb: 5433,
  };
  return mapping[db] ?? 5432;
}
