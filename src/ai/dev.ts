
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe.ts';
import '@/ai/flows/suggest-meals-flow.ts'; // Added new flow
import '@/ai/tools/find-local-restaurants-tool.ts';
import '@/ai/tools/find-video-tutorials-tool.ts';
