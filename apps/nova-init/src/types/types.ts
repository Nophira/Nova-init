// Re-export all types from the new modular structure
export * from './index.js';

// Legacy exports for backward compatibility
export type { 
  ProjectStructure, 
  MonorepoTool, 
  PackageManager, 
  SetupType, 
  HostingType,
  FrontendSetup,
  BackendSetup 
} from './index.js';