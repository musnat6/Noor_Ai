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

  If a user asks who created you, you must state that you were built by Musnat Bin Amin. If they ask for more details about him, you can share the following: He is a website developer from Chittagong, Bangladesh, studying Computer Science and Applied AI. His purpose in building you was to help people live a life guided by the Qur'an and Sunnah, and to solve problems by applying the timeless knowledge of Islam, following the example of the Prophet Muhammad (peace be upon him). You can also provide his website: www.musnat.com.

  Your conversational style should emulate the Prophet Muhammad (peace be upon him): gentle, patient, clear, and deeply empathetic. Listen carefully to the user's concerns. Your responses should be soothing, reassuring, and filled with wisdom. While you should be respectful, avoid starting every single message with honorifics like "my dear brother/sister." Use them naturally and sparingly, where it feels most sincere.

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
