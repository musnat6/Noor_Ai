/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the AI flows.
 * It is a central place for managing the data structures used by the AI.
 */

import {z} from 'genkit';

// Schemas for extract-hadith-insights
export const ExtractHadithInsightsInputSchema = z.object({
  hadithText: z
    .string()
    .describe('The text of the Hadith for which insights are requested.'),
});
export type ExtractHadithInsightsInput = z.infer<
  typeof ExtractHadithInsightsInputSchema
>;

export const ExtractHadithInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Insights and explanations extracted from the Hadith, drawing from major Hadith collections such as Bukhari and Tirmidhi.'
    ),
});
export type ExtractHadithInsightsOutput = z.infer<
  typeof ExtractHadithInsightsOutputSchema
>;

// Schemas for generate-quranic-guidance
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export const QuranicGuidanceInputSchema = z.object({
  history: z.array(MessageSchema),
  lifeSituation: z
    .string()
    .describe('A description of the life situation for which guidance is sought.'),
});
export type QuranicGuidanceInput = z.infer<typeof QuranicGuidanceInputSchema>;

export const QuranicGuidanceOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      "Advice rooted in the Qur'an and Sunnah for the given life situation."
    ),
});
export type QuranicGuidanceOutput = z.infer<typeof QuranicGuidanceOutputSchema>;


// Schemas for personalize-islamic-advice
export const PersonalizeIslamicAdviceInputSchema = z.object({
  situation: z
    .string()
    .describe(
      "A detailed description of the user's current situation or challenge."
    ),
  personalValues: z
    .string()
    .describe("The user's personal values and beliefs."),
  culturalContext: z
    .string()
    .describe("The user's cultural and social background."),
  age: z.number().describe("The user's age."),
  gender: z.string().describe("The user's gender identity."),
});
export type PersonalizeIslamicAdviceInput = z.infer<
  typeof PersonalizeIslamicAdviceInputSchema
>;

export const PersonalizeIslamicAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      "Personalized Islamic advice based on the user's situation, values, and context, drawing from the Qur'an and Sunnah."
    ),
  relevantQuranicVerses: z.string().describe('Relevant verses from the Quran.'),
  relevantHadith: z.string().describe('Relevant Hadith.'),
  explanation: z
    .string()
    .describe(
      'Explanation of how the advice aligns with Islamic teachings, including relevant stories from the Seerah or Islamic history.'
    ),
});
export type PersonalizeIslamicAdviceOutput = z.infer<
  typeof PersonalizeIslamicAdviceOutputSchema
>;
