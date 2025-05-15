
'use server';
/**
 * @fileOverview A tool to find local restaurants serving a specific dish.
 *
 * - findLocalRestaurantsTool - A Genkit tool definition.
 * - FindLocalRestaurantsInput - The input type for the tool.
 * - FindLocalRestaurantsOutput - The output type for the tool.
 */

import {ai} from '@/ai/genkit';
// Import Zod schemas and TS types from the shared file
import {
  FindLocalRestaurantsInputSchema,
  type FindLocalRestaurantsInput,
  FindLocalRestaurantsOutputSchema,
  type FindLocalRestaurantsOutput
} from '@/ai/schemas/shared-tool-schemas';

// Export only the TypeScript types
export type { FindLocalRestaurantsInput, FindLocalRestaurantsOutput };

export const findLocalRestaurantsTool = ai.defineTool(
  {
    name: 'findLocalRestaurantsTool',
    description: 'Returns a list of local restaurants that serve the given dish in a specified location.',
    inputSchema: FindLocalRestaurantsInputSchema,
    outputSchema: FindLocalRestaurantsOutputSchema,
  },
  async ({ recipeName, location }: FindLocalRestaurantsInput): Promise<FindLocalRestaurantsOutput> => {
    // Mock implementation for demonstration purposes
    console.log(`AI Tool: Searching for restaurants serving "${recipeName}" in "${location}"...`);
    // In a real application, this would call an external API (e.g., Google Places)
    // For now, return mock data
    const mockRestaurants = [
      {
        name: `The Original ${recipeName} House`,
        url: `https://example.com/restaurants/${recipeName.toLowerCase().replace(/\s+/g, '-')}-house`,
        description: `Famous for their authentic ${recipeName}.`
      },
      {
        name: `${location.split(',')[0]}'s Best ${recipeName}`,
        url: `https://example.com/restaurants/best-${recipeName.toLowerCase().replace(/\s+/g, '-')}`,
        description: `A local favorite for ${recipeName}.`
      },
    ];
    // Return a subset to simulate variability
    return mockRestaurants.slice(0, Math.random() > 0.3 ? 2 : 1);
  }
);
