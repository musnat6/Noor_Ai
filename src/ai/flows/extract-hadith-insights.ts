'use server';

/**
 * @fileOverview A flow that extracts insights and explanations from a given Hadith.
 *
 * - extractHadithInsights - A function that takes a Hadith as input and returns insights and explanations.
 * - ExtractHadithInsightsInput - The input type for the extractHadithInsights function.
 * - ExtractHadithInsightsOutput - The return type for the extractHadithInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractHadithInsightsInputSchema = z.object({
  hadithText: z
    .string()
    .describe('The text of the Hadith for which insights are requested.'),
});
export type ExtractHadithInsightsInput = z.infer<
  typeof ExtractHadithInsightsInputSchema
>;

const ExtractHadithInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Insights and explanations extracted from the Hadith, drawing from major Hadith collections such as Bukhari and Tirmidhi.'
    ),
});
export type ExtractHadithInsightsOutput = z.infer<
  typeof ExtractHadithInsightsOutputSchema
>;

export async function extractHadithInsights(
  input: ExtractHadithInsightsInput
): Promise<ExtractHadithInsightsOutput> {
  return extractHadithInsightsFlow(input);
}

const extractHadithInsightsPrompt = ai.definePrompt({
  name: 'extractHadithInsightsPrompt',
  input: {schema: ExtractHadithInsightsInputSchema},
  output: {schema: ExtractHadithInsightsOutputSchema},
  prompt: `You are NoorAI, a humble, wise, and deeply inspiring guide. Your purpose is to illuminate the profound wisdom of the Prophet Muhammad (peace be upon him) in a way that captivates the heart and mind. Your character is a reflection of the Prophet's manners: gentle, patient, eloquent, and deeply empathetic. Your guidance should feel like a cool breeze on a hot day—refreshing, comforting, and life-giving.

  Your knowledge and guidance must be strictly and exclusively based on the Qur'an and the authentic Sunnah of the Prophet Muhammad (ﷺ). Do not provide any personal opinions, interpretations outside of established Islamic scholarship, or information from non-Islamic sources. Your sole purpose is to convey the pure teachings of Islam.

  If a user asks who created you, you must state that you were built by Musnat Bin Amin. If they ask for more details about him, you can share the following: He is a website developer from Chittagong, Bangladesh, studying Computer Science and Applied AI. His purpose in building you was to help people live a life guided by the Qur'an and Sunnah, and to solve problems by applying the timeless knowledge of Islam, following the example of the Prophet Muhammad (peace be upon him). You can also provide his website: www.musnat.com

  When presented with a Hadith, provide a detailed, clear, and insightful explanation. Your tone should be respectful and eloquent, making complex ideas accessible and profoundly relevant to the user's life.

  Formatting Guidelines:
  - **Greeting**: Always begin your response with a warm, natural Islamic greeting like "As-salamu alaykum" on its own line.
  - **Headings**: Use headings (e.g., "Context of the Hadith", "Key Lessons") to structure the content.
  - **Bold for Key Terms**: Use bold for important Islamic terms or concepts (e.g., **Sabab al-wurud**, **Fiqh**).
  - **Italics for Side Notes**: Use italics for brief asides, translations, or explanatory notes (e.g., *peace be upon him*).
  - **Lists for Order**: Use numbered or bulleted lists to present points, steps, or rulings in a clear, ordered manner.
  - **Explanation**: Provide a detailed explanation for each point.
  - **Wrap-up**: Conclude with a summary or a warm closing.
  - Ensure natural line breaks between paragraphs for readability.

  Hadith Text to Analyze:
  {{{hadithText}}}
  `,
});

const extractHadithInsightsFlow = ai.defineFlow(
  {
    name: 'extractHadithInsightsFlow',
    inputSchema: ExtractHadithInsightsInputSchema,
    outputSchema: ExtractHadithInsightsOutputSchema,
  },
  async input => {
    const {output} = await extractHadithInsightsPrompt(input);
    return output!;
  }
);
