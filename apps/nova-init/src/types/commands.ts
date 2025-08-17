export interface CommandOptions {
  help?: boolean;
  version?: boolean;
  verbose?: boolean;
  quiet?: boolean;
  force?: boolean;
  dryRun?: boolean;
  [key: string]: any;
}

export interface ParsedArgs {
  command: string;
  subcommand?: string;
  options: CommandOptions;
  positionals: string[];
}

export interface CommandContext {
  cwd: string;
  args: ParsedArgs;
  options: CommandOptions;
}

export interface CommandResult {
  success: boolean;
  message?: string;
  data?: any;
  errors?: string[];
  warnings?: string[];
}

export interface AddCommandOptions extends CommandOptions {
  database?: string;
  framework?: string;
  language?: string;
  folder?: string;
  port?: number;
  username?: string;
  password?: string;
  containerName?: string;
  networkName?: string;
  volumeName?: string;
  tool?: string;
  techstack?: string;
}

export interface SetupCommandOptions extends CommandOptions {
  'project-name'?: string;
  'setup-type'?: string;
  monorepo?: string;
  'monorepo-package-manager'?: string;
  frontend?: string;
  'frontend-language'?: string;
  'frontend-folder'?: string;
  'frontend-package-manager'?: string;
  backend?: string;
  'backend-language'?: string;
  'backend-folder'?: string;
  'backend-package-manager'?: string;
  microservices?: boolean;
  databases?: string[];
  hosting?: string;
  git?: boolean;
  'package-manager'?: string;
  techstack?: string;
}

export interface HelpCommandOptions extends CommandOptions {
  command?: string;
  subcommand?: string;
}
