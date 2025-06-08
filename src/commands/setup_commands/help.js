import chalk from 'chalk';

export default function showHelp() {
  console.log(`
${chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗')} 
${chalk.bold.cyan('║')} ${chalk.bold.white('🚀 Nova Init CLI - Modern Project Scaffolding Tool')} ${chalk.bold.cyan('        ║')}
${chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝')}

${chalk.bold.yellow('📌 General Usage:')}
  ${chalk.green('npx nova-init')}                    ${chalk.gray('Start interactive project setup')}
  ${chalk.green('npx nova-init help')}              ${chalk.gray('Show this help message')}

${chalk.bold.yellow('🔧 Backend Commands:')}
  ${chalk.bold.cyan('Express:')}
    ${chalk.green('npx nova-init add backend --folder api --framework express --lang JavaScript')}
    ${chalk.green('npx nova-init add backend --folder api --framework express --lang TypeScript')}

  ${chalk.bold.cyan('NestJS:')}
    ${chalk.green('npx nova-init add backend --folder api --framework nestjs')}

  ${chalk.bold.cyan('Fastify:')}
    ${chalk.green('npx nova-init add backend --folder api --framework fastify --lang JavaScript')}
    ${chalk.green('npx nova-init add backend --folder api --framework fastify --lang TypeScript')}

${chalk.bold.yellow('🎨 Frontend Commands:')}
  ${chalk.bold.cyan('React (Create React App):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework react --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework react --lang TypeScript')}

  ${chalk.bold.cyan('React (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework react --lang JavaScript --vite')}
    ${chalk.green('npx nova-init add frontend --folder web --framework react --lang TypeScript --vite')}

  ${chalk.bold.cyan('Angular:')}
    ${chalk.green('npx nova-init add frontend --folder web --framework angular')}

  ${chalk.bold.cyan('Next.js:')}
    ${chalk.green('npx nova-init add frontend --folder web --framework nextjs --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework nextjs --lang TypeScript')}

  ${chalk.bold.cyan('Nuxt.js (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework nuxtjs --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework nuxtjs --lang TypeScript')}

  ${chalk.bold.cyan('Preact (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework preact --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework preact --lang TypeScript')}

  ${chalk.bold.cyan('Qwik (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework qwik --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework qwik --lang TypeScript')}

  ${chalk.bold.cyan('Solid (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework solid --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework solid --lang TypeScript')}

  ${chalk.bold.cyan('Svelte (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework svelte --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework svelte --lang TypeScript')}

  ${chalk.bold.cyan('Vue (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework vue --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework vue --lang TypeScript')}

  ${chalk.bold.cyan('Lit (Vite):')}
    ${chalk.green('npx nova-init add frontend --folder web --framework lit --lang JavaScript')}
    ${chalk.green('npx nova-init add frontend --folder web --framework lit --lang TypeScript')}

${chalk.bold.yellow('🗄️ Database Commands:')}
  ${chalk.bold.cyan('MongoDB:')}
    ${chalk.green('npx nova-init add database --folder db --database mongodb')}

  ${chalk.bold.cyan('PostgreSQL:')}
    ${chalk.green('npx nova-init add database --folder db --database postgres')}

  ${chalk.bold.cyan('MySQL:')}
    ${chalk.green('npx nova-init add database --folder db --database mysql')}

  ${chalk.bold.cyan('Redis:')}
    ${chalk.green('npx nova-init add database --folder db --database redis')}

${chalk.bold.yellow('⚙️ Parameters:')}
  ${chalk.cyan('--folder <name>')}    ${chalk.gray('Custom folder name (default: frontend/backend/database)')}
  ${chalk.cyan('--framework <name>')} ${chalk.gray('Framework selection (required)')}
  ${chalk.cyan('--lang <name>')}      ${chalk.gray('Programming language (JavaScript/TypeScript)')}
  ${chalk.cyan('--vite')}            ${chalk.gray('Use Vite instead of Create React App (React only)')}
  ${chalk.cyan('--database <name>')}  ${chalk.gray('Database selection (required for database setup)')}

${chalk.bold.yellow('📚 Available Frameworks:')}
  ${chalk.bold.cyan('Backend:')}
    ${chalk.gray('• Express (JavaScript/TypeScript)')}
    ${chalk.gray('• NestJS (TypeScript only)')}
    ${chalk.gray('• Fastify (JavaScript/TypeScript)')}

  ${chalk.bold.cyan('Frontend:')}
    ${chalk.gray('• React (with/without Vite)')}
    ${chalk.gray('• Angular (TypeScript only)')}
    ${chalk.gray('• Next.js (JavaScript/TypeScript)')}
    ${chalk.gray('• Nuxt.js (JavaScript/TypeScript, Vite only)')}
    ${chalk.gray('• Preact (JavaScript/TypeScript, Vite only)')}
    ${chalk.gray('• Qwik (JavaScript/TypeScript, Vite only)')}
    ${chalk.gray('• Solid (JavaScript/TypeScript, Vite only)')}
    ${chalk.gray('• Svelte (JavaScript/TypeScript, Vite only)')}
    ${chalk.gray('• Vue (JavaScript/TypeScript, Vite only)')}
    ${chalk.gray('• Lit (JavaScript/TypeScript, Vite only)')}

  ${chalk.bold.cyan('Database:')}
    ${chalk.gray('• MongoDB (NoSQL)')}
    ${chalk.gray('• PostgreSQL (SQL)')}
    ${chalk.gray('• MySQL (SQL)')}
    ${chalk.gray('• Redis (In-Memory)')}

${chalk.bold.yellow('🎯 Next Steps:')}
  ${chalk.gray('1. Change to project directory:')}
    ${chalk.green('cd <project-name>')}
  ${chalk.gray('2. Install dependencies:')}
    ${chalk.green('npm install')}
  ${chalk.gray('3. Start development server:')}
    ${chalk.green('npm start')}
  ${chalk.gray('4. For database setup:')}
    ${chalk.green('docker-compose up -d')}

${chalk.bold.cyan('╔════════════════════════════════════════════════════════════╗')}
${chalk.bold.cyan('║')} ${chalk.bold.white('Happy Coding! 🚀')} ${chalk.bold.cyan('                                          ║')}
${chalk.bold.cyan('╚════════════════════════════════════════════════════════════╝')}
`);
}
