import chalk from 'chalk';

export default function showHelp() {
  console.log(`
${chalk.bold.cyan('╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗')}
${chalk.bold.cyan('║')} ${chalk.bold.white('🚀 Nova Init CLI v1.3.0 - Modern Project Scaffolding Tool')} ${chalk.bold.cyan('                                    ║')}
${chalk.bold.cyan('║')} ${chalk.gray('Fast, simple and modern - Create your next application in seconds')} ${chalk.bold.cyan('                    ║')}
${chalk.bold.cyan('╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝')}

${chalk.bold.yellow('📋 General Usage:')}
  ${chalk.green('npx nova-init')}                    ${chalk.gray('Start interactive project setup')}
  ${chalk.green('npx nova-init help')}              ${chalk.gray('Show this help message')}
  ${chalk.green('npx nova-init --version')}         ${chalk.gray('Show version')}

${chalk.bold.yellow('🔧 Backend Frameworks:')}
  ${chalk.bold.cyan('Express.js:')}
    ${chalk.green('npx nova-init add backend --framework express --lang js')}
    ${chalk.green('npx nova-init add backend --framework express --lang ts')}

  ${chalk.bold.cyan('NestJS:')}
    ${chalk.green('npx nova-init add backend --framework nestjs')}

  ${chalk.bold.cyan('Fastify:')}
    ${chalk.green('npx nova-init add backend --framework fastify --lang js')}
    ${chalk.green('npx nova-init add backend --framework fastify --lang ts')}

${chalk.bold.yellow('🎨 Frontend Frameworks:')}
  ${chalk.bold.cyan('React:')}
    ${chalk.green('npx nova-init add frontend --framework react --lang js')}
    ${chalk.green('npx nova-init add frontend --framework react --lang ts')}
    ${chalk.gray('(Default: Create React App, use --vite flag for Vite)')}

  ${chalk.bold.cyan('Next.js:')}
    ${chalk.green('npx nova-init add frontend --framework nextjs --lang js')}
    ${chalk.green('npx nova-init add frontend --framework nextjs --lang ts')}

  ${chalk.bold.cyan('Vue.js:')}
    ${chalk.green('npx nova-init add frontend --framework vue --lang js')}
    ${chalk.green('npx nova-init add frontend --framework vue --lang ts')}

  ${chalk.bold.cyan('Svelte:')}
    ${chalk.green('npx nova-init add frontend --framework svelte --lang js')}
    ${chalk.green('npx nova-init add frontend --framework svelte --lang ts')}

  ${chalk.bold.cyan('Angular:')}
    ${chalk.green('npx nova-init add frontend --framework angular')}

  ${chalk.bold.cyan('Nuxt.js:')}
    ${chalk.green('npx nova-init add frontend --framework nuxtjs --lang js')}
    ${chalk.green('npx nova-init add frontend --framework nuxtjs --lang ts')}

  ${chalk.bold.cyan('Astro:')}
    ${chalk.green('npx nova-init add frontend --framework astro --lang js')}
    ${chalk.green('npx nova-init add frontend --framework astro --lang ts')}

  ${chalk.bold.cyan('Remix:')}
    ${chalk.green('npx nova-init add frontend --framework remix --lang js')}
    ${chalk.green('npx nova-init add frontend --framework remix --lang ts')}

  ${chalk.bold.cyan('Solid:')}
    ${chalk.green('npx nova-init add frontend --framework solid --lang js')}
    ${chalk.green('npx nova-init add frontend --framework solid --lang ts')}

  ${chalk.bold.cyan('Qwik:')}
    ${chalk.green('npx nova-init add frontend --framework qwik --lang js')}
    ${chalk.green('npx nova-init add frontend --framework qwik --lang ts')}

  ${chalk.bold.cyan('Preact:')}
    ${chalk.green('npx nova-init add frontend --framework preact --lang js')}
    ${chalk.green('npx nova-init add frontend --framework preact --lang ts')}

  ${chalk.bold.cyan('Lit:')}
    ${chalk.green('npx nova-init add frontend --framework lit --lang js')}
    ${chalk.green('npx nova-init add frontend --framework lit --lang ts')}

${chalk.bold.yellow('🗄️ Databases:')}
  ${chalk.bold.cyan('MongoDB:')}
    ${chalk.green('npx nova-init add database --database mongodb')}

  ${chalk.bold.cyan('PostgreSQL:')}
    ${chalk.green('npx nova-init add database --database postgres')}

  ${chalk.bold.cyan('MySQL:')}
    ${chalk.green('npx nova-init add database --database mysql')}

  ${chalk.bold.cyan('Redis:')}
    ${chalk.green('npx nova-init add database --database redis')}

${chalk.bold.yellow('⚙️ Monorepo Tools:')}
  ${chalk.bold.cyan('Turborepo:')}
    ${chalk.green('npx nova-init add monorepo --tool turborepo')}

  ${chalk.bold.cyan('Nx:')}
    ${chalk.green('npx nova-init add monorepo --tool nx')}

  ${chalk.bold.cyan('Lerna:')}
    ${chalk.green('npx nova-init add monorepo --tool lerna')}

${chalk.bold.yellow('🔧 Parameters & Options:')}
  ${chalk.cyan('--folder <name>')}     ${chalk.gray('Custom folder name (default: frontend/backend/database)')}
  ${chalk.cyan('--framework <name>')}  ${chalk.gray('Framework selection (required)')}
  ${chalk.cyan('--lang <name>')}       ${chalk.gray('Programming language (js/ts)')}
  ${chalk.cyan('--vite')}             ${chalk.gray('Use Vite instead of Create React App (React only)')}
  ${chalk.cyan('--database <name>')}   ${chalk.gray('Database selection (required for DB setup)')}
  ${chalk.cyan('--tool <name>')}       ${chalk.gray('Monorepo tool selection (required for monorepo)')}

${chalk.bold.yellow('📚 Available Technologies:')}
  ${chalk.bold.cyan('Backend:')}
    ${chalk.gray('• Express.js - Minimalist Node.js framework')}
    ${chalk.gray('• NestJS - Enterprise-ready Node.js framework')}
    ${chalk.gray('• Fastify - Fast and efficient Node.js framework')}

  ${chalk.bold.cyan('Frontend:')}
    ${chalk.gray('• React - JavaScript library for building UIs')}
    ${chalk.gray('• Next.js - React framework for production')}
    ${chalk.gray('• Vue.js - Progressive JavaScript framework')}
    ${chalk.gray('• Svelte - Cybernetically enhanced web apps')}
    ${chalk.gray('• Angular - Platform for mobile and desktop apps')}
    ${chalk.gray('• Nuxt.js - Vue.js framework for production')}
    ${chalk.gray('• Astro - Web framework for content websites')}
    ${chalk.gray('• Remix - Full-stack React framework')}
    ${chalk.gray('• Solid - JavaScript UI library')}
    ${chalk.gray('• Qwik - Instant-loading web apps')}
    ${chalk.gray('• Preact - Fast 3kB alternative to React')}
    ${chalk.gray('• Lit - Simple and fast web components')}

  ${chalk.bold.cyan('Databases:')}
    ${chalk.gray('• MongoDB - NoSQL database')}
    ${chalk.gray('• PostgreSQL - Object-relational database')}
    ${chalk.gray('• MySQL - Relational database')}
    ${chalk.gray('• Redis - In-memory data structure store')}

  ${chalk.bold.cyan('Monorepo Tools:')}
    ${chalk.gray('• Turborepo - High-performance build system')}
    ${chalk.gray('• Nx - Smart, fast and extensible build system')}
    ${chalk.gray('• Lerna - Tool for managing JavaScript projects')}

${chalk.bold.yellow('🎯 Next Steps After Creation:')}
  ${chalk.gray('1. Change to project directory:')}
    ${chalk.green('cd <project-name>')}
  ${chalk.gray('2. Install dependencies:')}
    ${chalk.green('npm install')}
  ${chalk.gray('3. Start development server:')}
    ${chalk.green('npm run dev')} ${chalk.gray('or')} ${chalk.green('npm start')}
  ${chalk.gray('4. For database setup:')}
    ${chalk.green('docker-compose up -d')}

${chalk.bold.yellow('💡 Tips:')}
  ${chalk.gray('• Use --help after each command for specific help')}
  ${chalk.gray('• Combine frontend and backend for full-stack projects')}
  ${chalk.gray('• Monorepo tools are perfect for large projects')}
  ${chalk.gray('• Docker is required for database setup')}

${chalk.bold.cyan('╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗')}
${chalk.bold.cyan('║')} ${chalk.bold.white('Happy Coding! 🚀')} ${chalk.bold.cyan('                                                                    ║')}
${chalk.bold.cyan('╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝')}
`);
}
