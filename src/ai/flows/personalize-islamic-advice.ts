'use server';
/**
 * @fileOverview AI flow to tailor Islamic advice to individual circumstances, 
 * incorporating principles from the Qur'an and Sunnah for relevance and applicability.
 *
 * - personalizeIslamicAdvice - A function that handles the personalization of Islamic advice.
 * - PersonalizeIslamicAdviceInput - The input type for the personalizeIslamicAdvice function.
 * - PersonalizeIslamicAdviceOutput - The return type for the personalizeIslamicAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeIslamicAdviceInputSchema = z.object({
  situation: z.string().describe('A detailed description of the user\'s current situation or challenge.'),
  personalValues: z.string().describe('The user\'s personal values and beliefs.'),
  culturalContext: z.string().describe('The user\'s cultural and social background.'),
  age: z.number().describe('The user\'s age.'),
  gender: z.string().describe('The user\'s gender identity.'),
});
export type PersonalizeIslamicAdviceInput = z.infer<typeof PersonalizeIslamicAdviceInputSchema>;

const PersonalizeIslamicAdviceOutputSchema = z.object({
  advice: z.string().describe('Personalized Islamic advice based on the user\'s situation, values, and context, drawing from the Qur\'an and Sunnah.'),
  relevantQuranicVerses: z.string().describe('Relevant verses from the Quran.'),
  relevantHadith: z.string().describe('Relevant Hadith.'),
  explanation: z.string().describe('Explanation of how the advice aligns with Islamic teachings.'),
});
export type PersonalizeIslamicAdviceOutput = z.infer<typeof PersonalizeIslamicAdviceOutputSchema>;

export async function personalizeIslamicAdvice(input: PersonalizeIslamicAdviceInput): Promise<PersonalizeIslamicAdviceOutput> {
  return personalizeIslamicAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeIslamicAdvicePrompt',
  input: {schema: PersonalizeIslamicAdviceInputSchema},
  output: {schema: PersonalizeIslamicAdviceOutputSchema},
  prompt: `You are an AI expert in Islamic teachings, providing personalized advice based on the Qur'an and Sunnah.

  Consider the user's situation, personal values, cultural context, age and gender to tailor your advice.

  Situation: {{{situation}}}
  Personal Values: {{{personalValues}}}
  Cultural Context: {{{culturalContext}}}
  Age: {{{age}}}
  Gender: {{{gender}}}

  Provide advice that is relevant, applicable, and aligned with Islamic principles. Include relevant Quranic verses and Hadith to support your advice.

  Format your response as follows:

  Advice: [Personalized Islamic advice]
  Relevant Quranic Verses: [List of relevant verses]
  Relevant Hadith: [List of relevant Hadith]
  Explanation: [Explanation of how the advice aligns with Islamic teachings]`,
});

const personalizeIslamicAdviceFlow = ai.defineFlow(
  {
    name: 'personalizeIslamicAdviceFlow',
    inputSchema: PersonalizeIslamicAdviceInputSchema,
    outputSchema: PersonalizeIslamicAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
