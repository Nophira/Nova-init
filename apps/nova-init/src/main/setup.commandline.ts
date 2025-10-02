import { ProjectManager } from '../core/ProjectManager.js';
import { TechstackManager } from '../core/TechstackManager.js';
import { normalizeOptionsToProject } from '../core/config-normalizer.js';
import type { SetupCommandOptions } from '../types/index.js';

export async function setupCommandLine(options: SetupCommandOptions): Promise<void> {
  try {
    console.log('🚀 Creating project with CLI options...');
    console.log('📋 Received options:', JSON.stringify(options, null, 2));

    let projectConfig;

    if (options.techstack) {
      console.log(`🎯 Using predefined tech stack: ${options.techstack}`);
      projectConfig = TechstackManager.createProjectFromTechStack(
        options.techstack,
        options.projectName!
      );
    } else {
      projectConfig = normalizeOptionsToProject(options);
    }

    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);

    console.log('\n✅ Project created successfully!');
    console.log(`📁 Project folder: ${projectConfig.projectName}`);
  } catch (error) {
    console.error('❌ CLI setup failed:', error);
    throw error;
  }
}
