import fs from 'fs-extra';
import * as path from 'path';
import type { ProjectStructure } from '../types/index.js';

/**
 * Nova-Init Configuration Writer
 * Handles writing and managing nova-init.json configuration files
 */
export class NovaInitWriter {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  /**
   * Write nova-init.json configuration file
   */
  async writeConfig(config: ProjectStructure): Promise<void> {
    try {
      const configData = this.generateConfigData(config);
      const filePath = path.join(this.projectPath, 'nova-init.json');
      
      await fs.ensureDir(this.projectPath);
      await fs.writeJson(filePath, configData, { spaces: 2 });
      
      console.log(`✅ nova-init.json created at: ${filePath}`);
    } catch (error) {
      console.error('❌ Error writing nova-init.json:', error);
      throw error;
    }
  }

  /**
   * Read existing nova-init.json configuration
   */
  async readConfig(): Promise<ProjectStructure | null> {
    try {
      const filePath = path.join(this.projectPath, 'nova-init.json');
      
      if (!await fs.pathExists(filePath)) {
        return null;
      }
      
      const config = await fs.readJson(filePath);
      return this.validateConfig(config);
    } catch (error) {
      console.error('❌ Error reading nova-init.json:', error);
      return null;
    }
  }

  /**
   * Update existing nova-init.json configuration
   */
  async updateConfig(updates: Partial<ProjectStructure>): Promise<void> {
    try {
      const existingConfig = await this.readConfig();
      if (!existingConfig) {
        throw new Error('No existing nova-init.json found');
      }

      const updatedConfig = { ...existingConfig, ...updates };
      await this.writeConfig(updatedConfig);
      
      console.log('✅ nova-init.json updated successfully');
    } catch (error) {
      console.error('❌ Error updating nova-init.json:', error);
      throw error;
    }
  }

  /**
   * Validate configuration data
   */
  private validateConfig(config: any): ProjectStructure {
    // Basic validation
    if (!config.projectName || typeof config.projectName !== 'string') {
      throw new Error('Invalid projectName in nova-init.json');
    }

    if (!config.setupType || !['custom', 'predefined'].includes(config.setupType)) {
      throw new Error('Invalid setupType in nova-init.json');
    }

    if (!config.monorepo || !['none', 'lerna', 'nx', 'turborepo'].includes(config.monorepo)) {
      throw new Error('Invalid monorepo in nova-init.json');
    }

    return config as ProjectStructure;
  }

  /**
   * Generate configuration data
   */
  private generateConfigData(config: ProjectStructure): any {
    return {
      projectName: config.projectName,
      setupType: config.setupType,
      monorepo: config.monorepo,
      packageManagers: config.packageManagers,
      frontend: config.frontend,
      backend: config.backend,
      databases: config.databases,
      hosting: config.hosting,
      techStack: config.techStack,
    };
  }

  /**
   * Check if nova-init.json exists
   */
  async configExists(): Promise<boolean> {
    const filePath = path.join(this.projectPath, 'nova-init.json');
    return await fs.pathExists(filePath);
  }

  /**
   * Get configuration file path
   */
  getConfigPath(): string {
    return path.join(this.projectPath, 'nova-init.json');
  }

  /**
   * Backup existing configuration
   */
  async backupConfig(): Promise<string | null> {
    try {
      const configPath = this.getConfigPath();
      if (!await fs.pathExists(configPath)) {
        return null;
      }

      const backupPath = `${configPath}.backup.${Date.now()}`;
      await fs.copy(configPath, backupPath);
      
      console.log(`📦 Configuration backed up to: ${backupPath}`);
      return backupPath;
    } catch (error) {
      console.error('❌ Error backing up configuration:', error);
      return null;
    }
  }

  /**
   * Restore configuration from backup
   */
  async restoreConfig(backupPath: string): Promise<void> {
    try {
      const configPath = this.getConfigPath();
      await fs.copy(backupPath, configPath);
      
      console.log(`🔄 Configuration restored from: ${backupPath}`);
    } catch (error) {
      console.error('❌ Error restoring configuration:', error);
      throw error;
    }
  }
}

// Legacy function for backward compatibility
export async function writeNovaInitJson(config: any): Promise<void> {
  console.warn('⚠️  writeNovaInitJson is deprecated. Use NovaInitWriter class instead.');
  
  const rootFolder = config.paths?.root || config.projectPath || '.';
  const writer = new NovaInitWriter(rootFolder);
  
  // Convert legacy config format to ProjectStructure
  const projectConfig: ProjectStructure = {
    projectName: config.projectName || 'unknown',
    setupType: config.setupType || 'custom',
    monorepo: config.monorepo || 'none',
    packageManagers: config.packageManagers || {},
    frontend: config.frontend,
    backend: config.backend,
    databases: config.databases || [],
    hosting: config.hosting || 'none',
    initializeGit: config.initializeGit || false,
    techStack: config.techStack,
  };
  
  await writer.writeConfig(projectConfig);
}
