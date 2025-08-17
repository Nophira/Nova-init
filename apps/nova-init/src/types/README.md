# NOVA-INIT Types

Diese Datei enthält alle zentralen Typdefinitionen für das Nova-Init Projekt. Alle Commands und Prompts sollten diese Types verwenden, um Konsistenz und Typsicherheit zu gewährleisten.

## 📁 Dateistruktur

```
src/types/
├── index.ts          # Haupttypes-Datei mit allen Exporten
├── constants.ts      # Konstanten und Utility-Funktionen
└── README.md         # Diese Dokumentation
```

## 🚀 Verwendung

### Import der Types

```typescript
// Alle Types importieren
import type { 
  ProjectStructure, 
  FrontendSetup, 
  BackendSetup,
  DatabaseSetup 
} from '../types/index.js';

// Oder spezifische Types
import type { PackageManager, Language } from '../types/index.js';
```

### Beispiel für einen Command

```typescript
import type { AddCommandOptions, AddCommandResult } from '../types/index.js';

export async function addFrontend(options: AddCommandOptions): Promise<AddCommandResult> {
  // Implementation hier
  return {
    success: true,
    addedType: 'frontend',
    createdFiles: ['package.json', 'src/'],
    errors: [],
    warnings: [],
    nextSteps: ['npm install', 'npm run dev']
  };
}
```

### Beispiel für einen Prompt

```typescript
import type { FrontendSetup, Language, FrontendFramework } from '../types/index.js';

export async function promptFrontend(): Promise<FrontendSetup> {
  const language: Language = await askLanguage();
  const framework: FrontendFramework = await askFramework();
  
  return {
    language,
    framework,
    packageManager: 'npm',
    features: ['typescript', 'vite']
  };
}
```

## 📋 Verfügbare Types

### Core Types
- `ProjectStructure` - Hauptkonfiguration für das gesamte Projekt
- `SetupType` - 'custom' | 'predefined'
- `MonorepoTool` - 'none' | 'lerna' | 'nx' | 'turborepo'
- `PackageManager` - 'npm' | 'yarn' | 'pnpm' | 'bun'
- `Language` - 'javascript' | 'typescript'

### Frontend Types
- `FrontendSetup` - Komplette Frontend-Konfiguration
- `FrontendFramework` - Alle verfügbaren Frontend-Frameworks
- `FrontendFeature` - Frontend-spezifische Features
- `FrontendStyling` - Styling-Optionen
- `StateManagement` - State Management Lösungen
- `TestingFramework` - Testing-Frameworks
- `BuildTool` - Build-Tools

### Backend Types
- `BackendSetup` - Komplette Backend-Konfiguration
- `BackendFramework` - Alle verfügbaren Backend-Frameworks
- `BackendFeature` - Backend-spezifische Features
- `BackendTestingFramework` - Backend Testing-Frameworks
- `DocumentationTool` - Dokumentations-Tools

### Database Types
- `DatabaseSetup` - Datenbank-Konfiguration
- `DatabaseType` - Alle verfügbaren Datenbanktypen
- `DockerDatabaseConfig` - Docker-spezifische Konfiguration
- `HealthCheck` - Health Check Konfiguration

### Command Types
- `AddCommandOptions` - Optionen für den Add-Command
- `SetupCommandOptions` - Optionen für den Setup-Command
- `ParsedArgs` - Parsed Command Line Arguments

### Result Types
- `SetupResult` - Ergebnis des Setup-Prozesses
- `AddCommandResult` - Ergebnis des Add-Commands

### Utility Types
- `PartialFrontendSetup` - Teilweise Frontend-Setup
- `RequiredFrontendSetup` - Erforderliche Frontend-Eigenschaften
- `ValidationRule` - Validierungsregeln
- `ValidationResult` - Validierungsergebnis

### Constants & Utilities
- `FRONTEND_FRAMEWORKS` - Alle Frontend-Frameworks mit Metadaten
- `BACKEND_FRAMEWORKS` - Alle Backend-Frameworks mit Metadaten
- `DATABASES` - Alle Datenbanken mit Metadaten
- `PACKAGE_MANAGERS` - Alle Package Manager mit Metadaten
- `MONOREPO_TOOLS` - Alle Monorepo-Tools mit Metadaten
- `HOSTING_OPTIONS` - Alle Hosting-Optionen mit Metadaten
- `TECH_STACKS` - Vordefinierte Tech Stacks
- Utility-Funktionen für Validierung und Port-Management

## 🔧 Best Practices

### 1. Immer Types verwenden
```typescript
// ✅ Gut - Mit Types
function createProject(config: ProjectStructure): void {
  // Implementation
}

// ❌ Schlecht - Ohne Types
function createProject(config: any): void {
  // Implementation
}
```

### 2. Spezifische Types statt generische
```typescript
// ✅ Gut - Spezifische Types
function setupFrontend(frontend: FrontendSetup): void {
  // Implementation
}

// ❌ Schlecht - Zu generisch
function setupFrontend(frontend: object): void {
  // Implementation
}
```

### 3. Union Types für enums
```typescript
// ✅ Gut - Union Types
type Language = 'javascript' | 'typescript';

// ❌ Schlecht - String
type Language = string;
```

### 4. Optionale Properties mit ?
```typescript
// ✅ Gut - Optionale Properties
interface FrontendSetup {
  language: Language;
  framework: FrontendFramework;
  features?: FrontendFeature[]; // Optional
}

// ❌ Schlecht - Alle Properties required
interface FrontendSetup {
  language: Language;
  framework: FrontendFramework;
  features: FrontendFeature[]; // Immer required
}
```

## 🆕 Neue Types hinzufügen

Wenn du neue Types hinzufügen möchtest:

1. **Type definieren** in `index.ts`
2. **JSDoc Kommentar** hinzufügen
3. **Export** in der Export-Sektion hinzufügen
4. **README aktualisieren** mit dem neuen Type

### Beispiel für einen neuen Type

```typescript
/**
 * Neue Konfiguration für CI/CD
 */
export interface CIConfig {
  provider: 'github' | 'gitlab' | 'bitbucket';
  autoDeploy: boolean;
  environment: 'staging' | 'production';
}

// In der Export-Sektion hinzufügen:
export type {
  // ... andere Types
  CIConfig,
};
```

### Beispiel für neue Konstanten

```typescript
// In constants.ts hinzufügen:
export const CI_PROVIDERS = {
  github: {
    name: 'GitHub Actions',
    description: 'CI/CD platform integrated with GitHub',
    website: 'https://github.com/features/actions'
  },
  gitlab: {
    name: 'GitLab CI/CD',
    description: 'Built-in CI/CD for GitLab',
    website: 'https://docs.gitlab.com/ee/ci/'
  }
} as const;

// In index.ts exportieren (wird automatisch durch export * from './constants.js' gemacht)
```

## 🐛 Fehlerbehebung

### Type nicht gefunden
```typescript
// ❌ Fehler: Type 'FrontendSetup' not found
import type { FrontendSetup } from '../types/index.js';

// ✅ Lösung: Überprüfe den Import-Pfad
import type { FrontendSetup } from '../../types/index.js';
```

### Type Mismatch
```typescript
// ❌ Fehler: Type 'string' is not assignable to type 'Language'
const language: Language = 'js'; // 'js' ist nicht in Language

// ✅ Lösung: Verwende gültige Werte
const language: Language = 'javascript';
```

## 📚 Weitere Ressourcen

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Best Practices](https://github.com/typescript-eslint/typescript-eslint)
- [Nova-Init Commands](../commands/)
- [Nova-Init Prompts](../main/prompts/)
