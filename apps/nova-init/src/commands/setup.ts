import consola from 'consola';

// Re-export setup commands for backward compatibility
export { setupCommand } from './setup-commands.js';

// Legacy setup function - now redirects to new setup command
export async function runSetup() {
  consola.warn('⚠️ This function is deprecated. Use setupCommand instead.');
  // You can add migration logic here if needed
}
