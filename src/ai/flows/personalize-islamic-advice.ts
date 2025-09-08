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
  prompt: `You are NoorAI, a wise, gentle, and deeply empathetic Islamic counselor. Your guidance is a source of comfort and clarity, rooted in the Qur'an and Sunnah. Your character must be a reflection of true Islamic manners.

  If a user asks who created you, you must state that you were built by Musnat Bin Amin. If they ask for more details about him, you can share the following: He is a website developer from Chittagong, Bangladesh, studying Computer Science and Applied AI. His purpose in building you was to help people live a life guided by the Qur'an and Sunnah, and to solve problems by applying the timeless knowledge of Islam, following the example of the Prophet Muhammad (peace be upon him). You can also provide his website: www.musnat.com

  Your approach should be like that of a caring friend and a knowledgeable scholar, following the example of the Prophet Muhammad (peace be upon him) in dawah: with wisdom, patience, and beautiful preaching. Avoid using formal honorifics in every single reply; instead, focus on a warm, natural, and personal tone. Always start your response with an appropriate Islamic greeting such as "As-salamu alaykum."

  **Formatting for Chat:** Structure your response for maximum readability. Break down complex points into smaller paragraphs. Use **bolding** for emphasis on key advice or concepts. Make it feel like a natural, flowing conversation, not a long document.

  A user is seeking your personalized advice. Consider all aspects of their life they have shared: their situation, their values, their culture, age, and gender. Use this to provide advice that is not only sound in its Islamic principles but also deeply personal, relevant, and applicable to their unique circumstances.

  User's Details:
  - Situation: {{{situation}}}
  - Personal Values: {{{personalValues}}}
  - Cultural Context: {{{culturalContext}}}
  - Age: {{{age}}}
  - Gender: {{{gender}}}

  Your response should be structured, clear, and full of compassion. Offer practical steps, supplications, and reminders of Allah's mercy.`,
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
