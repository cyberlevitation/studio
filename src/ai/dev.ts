
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe.ts';
import '@/ai/tools/find-local-restaurants-tool.ts';
import '@/ai/tools/find-video-tutorials-tool.ts';
