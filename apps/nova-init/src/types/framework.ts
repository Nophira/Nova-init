import type { PackageManager } from './package-manager.js';

export type Language = 'javascript' | 'typescript';

export type FrontendFramework = 
  | 'react' 
  | 'nextjs' 
  | 'vue' 
  | 'nuxtjs' 
  | 'svelte' 
  | 'angular' 
  | 'astro' 
  | 'remix' 
  | 'solid' 
  | 'qwik' 
  | 'preact' 
  | 'lit';

export type BackendFramework = 
  | 'express' 
  | 'nestjs' 
  | 'fastify' 
  | 'koa' 
  | 'hapi' 
  | 'adonisjs' 
  | 'strapi' 
  | 'prisma' 
  | 'typeorm' 
  | 'sequelize';

export interface FrontendSetup {
  language: Language;
  framework: FrontendFramework;
  folderName: string;
  packageManager: PackageManager;
  features?: FrontendFeature[];
  styling?: StylingFramework;
  stateManagement?: StateManagement;
  testing?: TestingFramework;
}

export interface BackendSetup {
  language: Language;
  framework: BackendFramework;
  useMicroservices: boolean;
  microserviceNames?: string[];
  folderName?: string;
  packageManager: PackageManager;
  features?: BackendFeature[];
  database?: DatabaseFramework;
  authentication?: AuthFramework;
  testing?: TestingFramework;
}

export type FrontendFeature = 
  | 'routing' 
  | 'state-management' 
  | 'styling' 
  | 'testing' 
  | 'pwa' 
  | 'ssr' 
  | 'ssg' 
  | 'api-integration';

export type BackendFeature = 
  | 'authentication' 
  | 'authorization' 
  | 'validation' 
  | 'caching' 
  | 'logging' 
  | 'monitoring' 
  | 'testing' 
  | 'documentation' 
  | 'rate-limiting';

export type StylingFramework = 
  | 'css' 
  | 'scss' 
  | 'sass' 
  | 'tailwind' 
  | 'styled-components' 
  | 'emotion' 
  | 'mui' 
  | 'chakra-ui' 
  | 'ant-design';

export type StateManagement = 
  | 'redux' 
  | 'zustand' 
  | 'recoil' 
  | 'jotai' 
  | 'valtio' 
  | 'mobx' 
  | 'context-api';

export type DatabaseFramework = 
  | 'prisma' 
  | 'typeorm' 
  | 'sequelize' 
  | 'mongoose' 
  | 'knex' 
  | 'drizzle';

export type AuthFramework = 
  | 'passport' 
  | 'next-auth' 
  | 'auth0' 
  | 'firebase-auth' 
  | 'supabase-auth' 
  | 'cognito';

export type TestingFramework = 
  | 'jest' 
  | 'vitest' 
  | 'cypress' 
  | 'playwright' 
  | 'testing-library' 
  | 'mocha' 
  | 'chai';
