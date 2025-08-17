import type { SelectChoice } from '@clack/prompts';

export interface PromptOptions {
  required?: boolean;
  default?: any;
  validate?: (value: any) => string | true;
  transform?: (value: any) => any;
}

export interface TextPromptOptions extends PromptOptions {
  placeholder?: string;
  initialValue?: string;
}

export interface SelectPromptOptions extends PromptOptions {
  choices: SelectChoice[];
  initialValue?: string;
}

export interface ConfirmPromptOptions extends PromptOptions {
  active?: string;
  inactive?: string;
}

export interface MultiSelectPromptOptions extends PromptOptions {
  choices: SelectChoice[];
  required?: boolean;
  maxItems?: number;
}

export interface PromptResult<T = any> {
  success: boolean;
  value: T;
  error?: string;
}

export interface PromptContext {
  projectName?: string;
  setupType?: string;
  monorepo?: string;
  frontend?: string;
  backend?: string;
  database?: string;
  hosting?: string;
  [key: string]: any;
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface PromptConfig {
  id: string;
  type: 'text' | 'select' | 'confirm' | 'multiselect' | 'spinner';
  message: string;
  options?: PromptOptions;
  validation?: ValidationRule[];
  dependsOn?: string[];
  condition?: (context: PromptContext) => boolean;
}
