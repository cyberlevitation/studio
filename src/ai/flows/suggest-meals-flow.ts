
'use server';
/**
 * @fileOverview AI flow to suggest meals based on a list of ingredients.
 *
 * - suggestMealsFromIngredients - A function that suggests meals.
 * - SuggestMealsInput - The input type for the suggestMealsFromIngredients function.
 * - SuggestMealsOutput - The return type for the suggestMealsFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { SuggestMealsInputSchema, SuggestMealsOutputSchema } from '@/ai/schemas/shared-tool-schemas';

export type SuggestMealsInput = z.infer<typeof SuggestMealsInputSchema>;
export type SuggestMealsOutput = z.infer<typeof SuggestMealsOutputSchema>;

export async function suggestMealsFromIngredients(input: SuggestMealsInput): Promise<SuggestMealsOutput> {
  return suggestMealsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMealsPrompt',
  input: {schema: SuggestMealsInputSchema},
  output: {schema: SuggestMealsOutputSchema},
  prompt: `You are a helpful culinary assistant.
Based on the following ingredients: {{{ingredients}}}

Suggest a list of 3-5 distinct meals that can be primarily made using these ingredients.
For each meal, provide a name and a very brief (1-2 sentences) description highlighting how the key ingredients could be used.
Focus on meals where the provided ingredients play a central role. If the ingredients are too sparse or don't lend themselves to common dishes, it's okay to suggest simpler ideas or state that.
`,
});

const suggestMealsFlow = ai.defineFlow(
  {
    name: 'suggestMealsFlow',
    inputSchema: SuggestMealsInputSchema,
    outputSchema: SuggestMealsOutputSchema,
  },
  async (input: SuggestMealsInput) => {
    if (!input.ingredients || input.ingredients.trim() === '') {
      return { suggestions: [] }; // Return empty suggestions if no ingredients are provided
    }
    const {output} = await prompt(input);
     if (!output || !output.suggestions) {
      throw new Error('The AI failed to generate meal suggestions.');
    }
    return output;
  }
);
