import {promptProjectSetup } from '@nova/prompts';
import { runCommand } from '@nova/utils';

export async function runInit(){
    const answer = await promptProjectSetup();

    await runCommand('npx'[]);
}