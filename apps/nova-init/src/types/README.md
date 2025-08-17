# Type System Documentation

Diese Dokumentation beschreibt die neue modulare Type-Struktur für das Nova-init Projekt.

## Struktur

```
types/
├── index.ts              # Zentrale Re-Export-Datei
├── project.ts            # Projekt-bezogene Types
├── framework.ts          # Frontend/Backend Framework Types
├── database.ts           # Datenbank-bezogene Types
├── package-manager.ts    # Package Manager Types
├── setup.ts              # Setup-Konfiguration Types
├── commands.ts           # Command-Line Interface Types
├── prompts.ts            # Prompt und UI Types
├── types.ts              # Legacy-Re-Export für Kompatibilität
└── shims.d.ts            # Module-Deklarationen
```

## Hauptmodule

### 1. **project.ts**
- `ProjectStructure` - Hauptkonfiguration für Projekte
- `MonorepoTool` - Unterstützte Monorepo-Tools
- `ProjectConfig` - Package.json-Konfiguration
- `ProjectPaths` - Projektpfade
- `ProjectMetadata` - Projekt-Metadaten

### 2. **framework.ts**
- `FrontendFramework` - Unterstützte Frontend-Frameworks
- `BackendFramework` - Unterstützte Backend-Frameworks
- `FrontendSetup` / `BackendSetup` - Framework-Konfigurationen
- `Language` - Programmiersprachen
- Feature-Types für Styling, State Management, etc.

### 3. **database.ts**
- `DatabaseType` - Unterstützte Datenbanken
- `DatabaseConfig` - JSON-Konfiguration für Datenbanken
- `DatabaseSetup` - Runtime-Datenbank-Konfiguration
- `DockerComposeConfig` - Docker-Compose-Konfiguration
- `ConnectionInfo` - Verbindungsinformationen

### 4. **package-manager.ts**
- `PackageManager` - Unterstützte Package Manager
- `PackageManagerConfig` - Package Manager-Konfiguration
- `PackageJson` - Vollständige Package.json-Struktur

### 5. **setup.ts**
- `SetupType` - Setup-Arten
- `HostingType` - Hosting-Optionen
- `SetupOptions` - Setup-Optionen
- `TechStack` - Vordefinierte Tech-Stacks

### 6. **commands.ts**
- `CommandOptions` - Basis-Command-Optionen
- `ParsedArgs` - Parsed Command-Line-Argumente
- `AddCommandOptions` - Add-Command-spezifische Optionen
- `SetupCommandOptions` - Setup-Command-spezifische Optionen

### 7. **prompts.ts**
- `PromptOptions` - Basis-Prompt-Optionen
- `PromptResult` - Prompt-Ergebnisse
- `PromptContext` - Prompt-Kontext
- `ValidationRule` - Validierungsregeln

## Verwendung

### Import aller Types
```typescript
import type { 
  ProjectStructure, 
  FrontendSetup, 
  DatabaseSetup,
  PackageManager 
} from '../types/index.js';
```

### Spezifische Imports
```typescript
import type { DatabaseType } from '../types/database.js';
import type { FrontendFramework } from '../types/framework.js';
```

## Vorteile der neuen Struktur

1. **Modularität** - Types sind nach Funktionsbereichen organisiert
2. **Wartbarkeit** - Einfache Änderungen ohne Beeinträchtigung anderer Module
3. **Typsicherheit** - Vollständige TypeScript-Unterstützung
4. **Erweiterbarkeit** - Neue Types können einfach hinzugefügt werden
5. **Dokumentation** - Jeder Type ist vollständig dokumentiert
6. **Kompatibilität** - Legacy-Imports funktionieren weiterhin

## Migration von der alten Struktur

Die alte `types.ts` Datei re-exportiert alle neuen Types für Rückwärtskompatibilität:

```typescript
// Alte Imports funktionieren weiterhin
import type { ProjectStructure } from '../types/types.js';

// Neue Imports sind bevorzugt
import type { ProjectStructure } from '../types/index.js';
```

## Best Practices

1. **Verwende spezifische Imports** für bessere Tree-Shaking
2. **Erweitere Types** durch Interface-Extension
3. **Dokumentiere neue Types** mit JSDoc-Kommentaren
4. **Verwende Union Types** für enums
5. **Nutze Generic Types** für wiederverwendbare Strukturen
