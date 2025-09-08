'use server';

/**
 * @fileOverview Centralized Genkit AI initialization.
 *
 * This file configures and exports a single Genkit `ai` object that is used throughout the application.
 * It ensures that the Google AI plugin is configured with the necessary API key.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],
});
