export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface PackageManagerConfig {
  name: PackageManager;
  version: string;
  lockFile: string;
  installCommand: string;
  addCommand: string;
  removeCommand: string;
  runCommand: string;
  buildCommand: string;
  devCommand: string;
  testCommand: string;
  lintCommand: string;
  formatCommand: string;
}

export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  module?: string;
  types?: string;
  exports?: Record<string, any>;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  private?: boolean;
  workspaces?: string[] | Record<string, string[]>;
  keywords?: string[];
  author?: string | Person;
  license?: string;
  repository?: Repository;
  bugs?: Bugs;
  homepage?: string;
  files?: string[];
  bin?: Record<string, string>;
  man?: string | string[];
  directories?: Directories;
  config?: Record<string, any>;
  publishConfig?: Record<string, any>;
}

export interface Person {
  name: string;
  email?: string;
  url?: string;
}

export interface Repository {
  type: string;
  url: string;
  directory?: string;
}

export interface Bugs {
  url?: string;
  email?: string;
}

export interface Directories {
  lib?: string;
  bin?: string;
  man?: string;
  doc?: string;
  example?: string;
  test?: string;
}
