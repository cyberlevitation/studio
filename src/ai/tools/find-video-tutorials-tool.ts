
'use server';
/**
 * @fileOverview A tool to find video tutorials for a specific recipe.
 *
 * - findVideoTutorialsTool - A Genkit tool definition.
 * - FindVideoTutorialsInput - The input type for the tool.
 * - FindVideoTutorialsOutput - The output type for the tool.
 */

import {ai} from '@/ai/genkit';
// Import Zod schemas and TS types from the shared file
import {
  FindVideoTutorialsInputSchema,
  type FindVideoTutorialsInput,
  FindVideoTutorialsOutputSchema,
  type FindVideoTutorialsOutput
} from '@/ai/schemas/shared-tool-schemas';

// Export only the TypeScript types
export type { FindVideoTutorialsInput, FindVideoTutorialsOutput };

export const findVideoTutorialsTool = ai.defineTool(
  {
    name: 'findVideoTutorialsTool',
    description: 'Returns a list of video tutorials for cooking the given recipe.',
    inputSchema: FindVideoTutorialsInputSchema,
    outputSchema: FindVideoTutorialsOutputSchema,
  },
  async ({ recipeName }: FindVideoTutorialsInput): Promise<FindVideoTutorialsOutput> => {
    // Mock implementation for demonstration purposes
    console.log(`AI Tool: Searching for video tutorials for "${recipeName}"...`);
    // In a real application, this would call an external API (e.g., YouTube Search API)
    // For now, return mock data
    const mockVideos = [
      {
        title: `Easy Step-by-Step ${recipeName} Tutorial`,
        url: `https://www.youtube.com/watch?v=example_${recipeName.toLowerCase().replace(/\s+/g, '_')}_easy`,
        channelName: 'QuickNCleanCooking'
      },
      {
        title: `Mastering ${recipeName} with Chef Pro`,
        url: `https://www.youtube.com/watch?v=example_${recipeName.toLowerCase().replace(/\s+/g, '_')}_pro`,
        channelName: 'GourmetAdventures'
      },
      {
        title: `Simple ${recipeName} For Beginners`,
        url: `https://www.youtube.com/watch?v=example_${recipeName.toLowerCase().replace(/\s+/g, '_')}_beginner`,
        channelName: 'HomeCookHeroes'
      }
    ];
     // Return a subset to simulate variability
    return mockVideos.slice(0, Math.random() > 0.3 ? 2 : 1);
  }
);
