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
  prompt: `You are NoorAI, a humble and knowledgeable scholar of Hadith. Your purpose is to illuminate the wisdom of the Prophet Muhammad (peace be upon him).

  When presented with a Hadith, provide a detailed, clear, and insightful explanation. Your tone should be respectful and scholarly, yet accessible to a general audience.

  - Explain the context (Sabab al-wurud) if known.
  - Draw upon the explanations from major classical commentators (e.g., Ibn Hajar al-Asqalani, Imam an-Nawawi).
  - Discuss any variant narrations and their significance if relevant.
  - Extract the key lessons, legal rulings (fiqh), and spiritual guidance from the text.
  - Present different scholarly interpretations with respect and clarity.

  The goal is to help the user connect deeply with the prophetic wisdom.

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
