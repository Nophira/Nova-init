// src/prompts/types.ts

export type Language = 'ts' | 'js';

export type PackageManager = 'npm' | 'bun' | 'pnpm';

export type FrontendFramework =
  | 'react'
  | 'nextjs'
  | 'vue'
  | 'svelte'
  | 'angular'
  | 'nuxtjs'
  | 'astro'
  | 'remix'
  | 'solid'
  | 'qwik'
  | 'preact'
  | 'lit'
  | 'none';

export type BackendFramework = 
| 'express' 
| 'nestjs' 
| 'fastify' 
| 'none';

export type Database =
  | 'mongodb'
  | 'postgresql'
  | 'mysql'
  | 'mariadb'
  | 'redis'
  | 'cassandra'
  | 'cockroachdb'
  | 'couchdb'
  | 'edgedb'
  | 'neo4j'
  | 'surrealdb'
  | 'yugabytedb'
  | 'none';

export type MonorepoTool = 'lerna' | 'nx' | 'turborepo' | 'none';

export type Techstack =
  | 'mern'
  | 'mean'
  | 'mevn'
  | 'mern_ts'
  | 'mean_ts'
  | 'mevn_ts'
  | 'none';

export interface MicroserviceConfig {
  enabled: boolean;
  services?: string[]; // optionale Liste von Microservices
}

export interface DockerConfig {
  enabled: boolean;
  
}

export interface GitConfig {
  init: boolean;
  remoteUrl?: string;
}

export interface ProjectStructure {
  language: Language;
  frontend: FrontendFramework;
  backend: BackendFramework;
  database: Database;
  monorepo: MonorepoTool;
  techstack: Techstack;
  microservice: MicroserviceConfig;
  docker: DockerConfig;
  git: GitConfig;
  packageManagers: {
    monorepo: PackageManager;
    frontend: PackageManager;
    backend: PackageManager;
  };
  paths: Record<string, string>;
}

