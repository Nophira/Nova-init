import { askQuestions } from '@nova/prompts';

export async function runInit() {
    const answer = await askQuestions();
    // Hier kann weitere Logik folgen, z.B. Projekt-Setup basierend auf answer
}