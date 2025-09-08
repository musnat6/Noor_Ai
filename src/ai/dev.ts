import { config } from 'dotenv';
config();

// This file is used to register flows for the Genkit developer UI.
// See `npm run genkit:dev`
import '@/ai/schemas.ts';
import '@/ai/flows/extract-hadith-insights.ts';
import '@/ai/flows/personalize-islamic-advice.ts';
import '@/ai/flows/generate-quranic-guidance.ts';
