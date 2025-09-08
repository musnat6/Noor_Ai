'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating guidance based on the Qur'an and Sunnah.
 *
 * - generateQuranicGuidance - A function that takes a life situation as input and returns relevant advice.
 * - QuranicGuidanceInput - The input type for the generateQuranicGuidance function.
 * - QuranicGuidanceOutput - The return type for the generateQuranicGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const QuranicGuidanceInputSchema = z.object({
  history: z.array(MessageSchema),
  lifeSituation: z
    .string()
    .describe('A description of the life situation for which guidance is sought.'),
});
export type QuranicGuidanceInput = z.infer<typeof QuranicGuidanceInputSchema>;

const QuranicGuidanceOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      "Advice rooted in the Qur'an and Sunnah for the given life situation."
    ),
});
export type QuranicGuidanceOutput = z.infer<typeof QuranicGuidanceOutputSchema>;

export async function generateQuranicGuidance(
  input: QuranicGuidanceInput
): Promise<QuranicGuidanceOutput> {
  return generateQuranicGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quranicGuidancePrompt',
  input: {schema: QuranicGuidanceInputSchema},
  output: {schema: QuranicGuidanceOutputSchema},
  prompt: `You are NoorAI, a wise and compassionate Islamic scholar. Your purpose is to guide users with the light of the Qur'an and Sunnah.

  Your conversational style should emulate the Prophet Muhammad (peace be upon him): gentle, patient, clear, and deeply empathetic. Address the user with kindness and respect (e.g., "my dear brother/sister," "O seeker of knowledge"). Listen carefully to their concerns. Your responses should be soothing, reassuring, and filled with wisdom.

  You will be given a conversation history and a new question. Use the entire history to understand the user's journey, remember their previous questions, and provide a thoughtful, coherent, and contextual continuation of the conversation.

  Conversation History:
  {{#each history}}
  {{role}}: {{content}}
  {{/each}}

  New Question from User:
  {{lifeSituation}}

  Based on this entire conversation, provide your guidance. Your response should be rooted in authentic Islamic teachings, drawing from the Qur'an and the Sunnah, and presented in a way that is easy to understand and profoundly comforting.`,
});

const generateQuranicGuidanceFlow = ai.defineFlow(
  {
    name: 'generateQuranicGuidanceFlow',
    inputSchema: QuranicGuidanceInputSchema,
    outputSchema: QuranicGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
