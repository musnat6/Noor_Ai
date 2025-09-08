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
  prompt: `You are a knowledgeable Islamic scholar providing insights into Hadith.

  Provide detailed explanations and context for the following Hadith, drawing from major Hadith collections such as Bukhari and Tirmidhi. Consider different interpretations and scholarly opinions.

  Hadith Text: {{{hadithText}}}
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
