import consola from 'consola';

export function printHelp() {
  consola.info(`
🚀 Nova-Init

Usage:
  nova-init setup [options]

Options (setup):
  -p,  --project-name <name>
  -m,  --monorepo <type>               turborepo | nx | lerna | none
  -mp, --monorepo-package-manager      npm | pnpm | bun
  -pm, --package-manager <pm>          npm | pnpm | bun
  -t,  --techstack <name>              MERN | MEAN | MEVN | MERN_TS | MEAN_TS | MEVN_TS
  -st, --setup-type <type>             custom | predefined
  -f,  --frontend <framework>
  -fl, --frontend-language <lang>      typescript | javascript
  -ff, --frontend-folder <name>
  -fp, --frontend-package-manager      npm | pnpm | bun
  -b,  --backend <framework>
  -bl, --backend-language <lang>       typescript | javascript
  -bf, --backend-folder <name>
  -bp, --backend-package-manager       npm | pnpm | bun
  -ms, --microservices <names>
  -d,  --databases <names>
  -H,  --hosting <type>                docker | none
  -g,  --git
  -h,  --help
`);
}
