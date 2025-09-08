import { config } from 'dotenv';
config();

// This file is used to register flows for the Genkit developer UI.
// See `npm run genkit:dev`
import './schemas';
import './flows/extract-hadith-insights';
import './flows/personalize-islamic-advice';
import './flows/generate-quranic-guidance';
