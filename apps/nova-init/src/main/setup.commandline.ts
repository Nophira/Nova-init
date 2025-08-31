import { ProjectManager } from '../core/ProjectManager.js';
import { TechstackManager } from '../core/TechstackManager.js';
import type { ProjectStructure, SetupCommandOptions, DatabaseType } from '../types/index.js';

export async function setupCommandLine(options: SetupCommandOptions): Promise<void> {
  try {
    console.log('🚀 Creating project with command-line parameters...');
    console.log('📋 Received options:', JSON.stringify(options, null, 2));


    if (!options.projectName) {
      throw new Error('Project name is required. Use --project-name <name>');
    }

    const projectName = options.projectName;

    let projectConfig: ProjectStructure;

  
    if (options.techstack) {
      console.log(`🎯 Using predefined tech stack: ${options.techstack}`);
      projectConfig = TechstackManager.createProjectFromTechStack(options.techstack, projectName!);
    } else {
     
      const selectedDatabases = options.databases ?
        (options.databases as string).split(',').map(db => ({
          type: db.trim() as DatabaseType,
          name: db.trim(),
          useDocker: true,
          connectionString: undefined,
        })) : [];


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
          buildTool: (options.frontend === 'react' && options.vite !== false) ? 'vite' : undefined,
        } : undefined,
        backend: options.backend ? {
          language: options.backendLanguage || 'typescript',
          framework: options.backend as any,
          useMicroservices: Boolean(options.microservices),
          microserviceNames: Boolean(options.microservices)
            ? ['user', 'worker', 'payment', 'gateway']
            : undefined,
          folderName: options.backendFolder || 'backend',
          packageManager: options.backendPackageManager || options.packageManager || 'npm',
        } : undefined,
        databases: selectedDatabases,
        initializeGit: Boolean(options.git),
        techStack: options.techstack,
      };
    }

    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);

    console.log('\n✅ Project created successfully!');
    console.log(`📁 Project folder: ${projectName}`);
    console.log('\nNext steps:');
    console.log(`1. cd ${projectName}`);
    console.log('2. npm run dev (or appropriate command)');

  } catch (error) {
    console.error('❌ Command-line setup failed:', error);
    throw error;
  }
}