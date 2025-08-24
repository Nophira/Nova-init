import { consola } from 'consola';
import { intro, outro, text, select, confirm, multiselect, spinner } from '@clack/prompts';
import { ProjectManager } from '../core/ProjectManager.js';
import type { ProjectStructure } from '../types/index.js';

export async function setupPrompt(): Promise<void> {
  try {
    // Einführung
    intro('🚀 Willkommen bei Nova-Init!');
    consola.info('Lass uns dein Projekt Schritt für Schritt aufsetzen.\n');

    // Projektname abfragen
    const projectName = await text({
      message: 'Wie soll dein Projekt heißen?',
      placeholder: 'mein-awesome-projekt',
      validate: (value) => {
        if (!value) return 'Projektname ist erforderlich';
        if (!/^[a-z0-9-]+$/.test(value)) {
          return 'Projektname darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten';
        }
        return undefined;
      }
    }) as string;

    if (!projectName) {
      consola.error('❌ Projektname ist erforderlich');
      process.exit(1);
    }

    // Setup-Typ wählen
    const setupType = await select({
      message: 'Welchen Setup-Typ möchtest du verwenden?',
      options: [
        { value: 'predefined', label: '🏗️  Vordefinierter Tech Stack (MERN, MEAN, etc.)' },
        { value: 'custom', label: '⚙️  Custom Setup (alles selbst konfigurieren)' }
      ]
    }) as string | symbol;

    let projectConfig: ProjectStructure;

    if (setupType === 'predefined') {
      projectConfig = await promptPredefinedSetup(projectName);
    } else if (setupType === 'custom') {
      projectConfig = await promptCustomSetup(projectName);
    } else {
      consola.error('❌ Ungültiger Setup-Typ');
      process.exit(1);
    }

    // Bestätigung anzeigen
    const confirmed = await confirm({
      message: `Möchtest du das Projekt "${projectName}" mit dieser Konfiguration erstellen?`
    }) as boolean;

    if (!confirmed) {
      outro('❌ Setup abgebrochen');
      process.exit(0);
    }

    // Projekt erstellen
    const s = spinner();
    s.start('🚀 Erstelle dein Projekt...');

    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);

    s.stop('✅ Projekt erfolgreich erstellt!');

    // Erfolgsmeldung
    outro(`🎉 Projekt "${projectName}" wurde erfolgreich erstellt!

📁 Projektordner: ${projectName}
🚀 Nächste Schritte:
   1. cd ${projectName}
   2. npm run dev (oder entsprechender Befehl)

💡 Tipp: Verwende 'npx create-nova-init info' um Projektinformationen anzuzeigen`);

  } catch (error) {
    consola.error('❌ Interaktiver Setup fehlgeschlagen:', error);
    throw error;
  }
}

async function promptPredefinedSetup(projectName: string): Promise<ProjectStructure> {
  const techStack = await select({
    message: 'Welchen vordefinierten Tech Stack möchtest du verwenden?',
    options: [
      { value: 'MERN', label: 'MERN Stack (MongoDB + Express + React + Node.js)' },
      { value: 'MERN_TS', label: 'MERN Stack + TypeScript' },
      { value: 'MEAN', label: 'MEAN Stack (MongoDB + Express + Angular + Node.js)' },
      { value: 'MEAN_TS', label: 'MEAN Stack + TypeScript' },
      { value: 'MEVN', label: 'MEVN Stack (MongoDB + Express + Vue + Node.js)' },
      { value: 'MEVN_TS', label: 'MEVN Stack + TypeScript' },
      { value: 'FULLSTACK_TS', label: 'Fullstack TypeScript (React + Express + PostgreSQL)' }
    ]
  }) as string;

  if (!techStack) {
    throw new Error('Tech Stack ist erforderlich');
  }

  // TechstackManager importieren und Projekt erstellen
  const { TechstackManager } = await import('../core/TechstackManager.js');
  return TechstackManager.createProjectFromTechStack(techStack, projectName);
}

async function promptCustomSetup(projectName: string): Promise<ProjectStructure> {
  // Monorepo-Tool wählen
  const monorepo = await select({
    message: 'Möchtest du ein Monorepo verwenden?',
    options: [
      { value: 'none', label: '❌ Nein, einfaches Projekt' },
      { value: 'turborepo', label: '🚀 Turborepo (empfohlen)' },
      { value: 'nx', label: '⚡ Nx' },
      { value: 'lerna', label: '📦 Lerna' }
    ]
  }) as string;

  // Package Manager wählen
  const packageManager = await select({
    message: 'Welchen Package Manager möchtest du verwenden?',
    options: [
      { value: 'npm', label: '📦 npm' },
      { value: 'pnpm', label: '🚀 pnpm (schneller, platzsparender)' },
      { value: 'bun', label: '⚡ Bun (ultra-schnell)' },
      { value: 'yarn', label: '🧶 Yarn' }
    ]
  }) as string;

  // Frontend konfigurieren
  const hasFrontend = await confirm({
    message: 'Möchtest du ein Frontend hinzufügen?'
  }) as boolean;

  let frontend: any = undefined;
  if (hasFrontend) {
    frontend = await promptFrontendSetup(packageManager);
  }

  // Backend konfigurieren
  const hasBackend = await confirm({
    message: 'Möchtest du ein Backend hinzufügen?'
  }) as boolean;

  let backend: any = undefined;
  if (hasBackend) {
    backend = await promptBackendSetup(packageManager);
  }

  // Datenbanken wählen
  const databases = await promptDatabases();

  // Git initialisieren
  const initializeGit = await confirm({
    message: 'Soll ein Git-Repository initialisiert werden?',
    initialValue: true
  }) as boolean;

  // Hosting wählen
  const hosting = await select({
    message: 'Welches Hosting möchtest du verwenden?',
    options: [
      { value: 'none', label: '❌ Kein Hosting' },
      { value: 'vercel', label: '▲ Vercel (Frontend)' },
      { value: 'netlify', label: '🌐 Netlify (Frontend)' },
      { value: 'railway', label: '🚂 Railway (Fullstack)' },
      { value: 'heroku', label: '🦸 Heroku (Fullstack)' }
    ]
  }) as string;

  return {
    projectName,
    setupType: 'custom',
    monorepo: monorepo as any, // Type casting für MonorepoTool
    packageManagers: {
      monorepo: monorepo !== 'none' ? packageManager as any : undefined,
      frontend: frontend?.packageManager || packageManager as any,
      backend: backend?.packageManager || packageManager as any,
    },
    frontend,
    backend,
    databases,
    hosting: hosting as any, // Type casting für HostingOption
    initializeGit,
    techStack: undefined,
  };
}

async function promptFrontendSetup(packageManager: string) {
  const framework = await select({
    message: 'Welches Frontend-Framework möchtest du verwenden?',
    options: [
      { value: 'react', label: '⚛️  React' },
      { value: 'vue', label: '💚 Vue.js' },
      { value: 'angular', label: '🅰️  Angular' },
      { value: 'svelte', label: '🎯 Svelte' },
      { value: 'nextjs', label: '⚡ Next.js (React + SSR)' },
      { value: 'nuxtjs', label: '🟢 Nuxt.js (Vue + SSR)' },
      { value: 'astro', label: '🚀 Astro (Multi-Framework)' },
      { value: 'qwik', label: '⚡ Qwik (Resumable)' },
      { value: 'solid', label: '🧱 Solid.js' },
      { value: 'preact', label: '⚡ Preact (React-kompatibel)' },
      { value: 'lit', label: '💡 Lit (Web Components)' },
      { value: 'remix', label: '🔄 Remix (React + Fullstack)' }
    ]
  }) as string;

  const language = await select({
    message: 'Welche Programmiersprache möchtest du verwenden?',
    options: [
      { value: 'typescript', label: '🔷 TypeScript (empfohlen)' },
      { value: 'javascript', label: '🟡 JavaScript' }
    ]
  }) as string;

  const folderName = await text({
    message: 'Wie soll der Frontend-Ordner heißen?',
    placeholder: 'frontend',
    initialValue: 'frontend'
  }) as string;

  const frontendPackageManager = await select({
    message: 'Welchen Package Manager für das Frontend?',
    options: [
      { value: packageManager, label: `Verwende ${packageManager} (Haupt-Package-Manager)` },
      { value: 'npm', label: '📦 npm' },
      { value: 'pnpm', label: '🚀 pnpm' },
      { value: 'bun', label: '⚡ Bun' },
      { value: 'yarn', label: '🧶 Yarn' }
    ]
  }) as string;

  return {
    language,
    framework,
    folderName: folderName || 'frontend',
    packageManager: frontendPackageManager,
  };
}

async function promptBackendSetup(packageManager: string) {
  const framework = await select({
    message: 'Welches Backend-Framework möchtest du verwenden?',
    options: [
      { value: 'express', label: '🚀 Express.js (Node.js)' },
      { value: 'fastify', label: '⚡ Fastify (Node.js, schneller)' },
      { value: 'nestjs', label: '🪺 NestJS (Node.js, strukturiert)' }
    ]
  }) as string;

  const language = await select({
    message: 'Welche Programmiersprache möchtest du verwenden?',
    options: [
      { value: 'typescript', label: '🔷 TypeScript (empfohlen)' },
      { value: 'javascript', label: '🟡 JavaScript' }
    ]
  }) as string;

  const useMicroservices = await confirm({
    message: 'Möchtest du eine Microservices-Architektur verwenden?',
    initialValue: false
  }) as boolean;

  const folderName = await text({
    message: 'Wie soll der Backend-Ordner heißen?',
    placeholder: 'backend',
    initialValue: 'backend'
  }) as string;

  const backendPackageManager = await select({
    message: 'Welchen Package Manager für das Backend?',
    options: [
      { value: packageManager, label: `Verwende ${packageManager} (Haupt-Package-Manager)` },
      { value: 'npm', label: '📦 npm' },
      { value: 'pnpm', label: '🚀 pnpm' },
      { value: 'bun', label: '⚡ Bun' },
      { value: 'yarn', label: '🧶 Yarn' }
    ]
  }) as string;

  return {
    language,
    framework,
    useMicroservices,
    folderName: folderName || 'backend',
    packageManager: backendPackageManager,
  };
}

async function promptDatabases() {
  const databaseTypes = await multiselect({
    message: 'Welche Datenbanken möchtest du verwenden? (Leertaste für Auswahl, Enter für Bestätigung)',
    options: [
      { value: 'postgresql', label: '🐘 PostgreSQL (SQL)' },
      { value: 'mysql', label: '🐬 MySQL (SQL)' },
      { value: 'mongodb', label: '🍃 MongoDB (NoSQL)' },
      { value: 'redis', label: '🔴 Redis (Cache/Key-Value)' },
      { value: 'neo4j', label: '🟢 Neo4j (Graph)' },
      { value: 'cassandra', label: '📊 Cassandra (NoSQL)' },
      { value: 'couchdb', label: '🛋️  CouchDB (NoSQL)' },
      { value: 'mariadb', label: '🐬 MariaDB (SQL)' },
      { value: 'edgedb', label: '⚡ EdgeDB (Modern SQL)' },
      { value: 'yugabytedb', label: '🦎 YugabyteDB (Distributed SQL)' },
      { value: 'surrealdb', label: '🌊 SurrealDB (Multi-Model)' }
    ],
    required: false
  }) as string[];

  if (!databaseTypes || databaseTypes.length === 0) {
    return [];
  }

  return databaseTypes.map(type => ({
    name: type, // Name hinzufügen für DatabaseSetup
    type: type as any, // Type casting für DatabaseType
    useDocker: true, // Standardmäßig Docker verwenden
    connectionString: undefined
  }));
}
