// 'use server';

/**
 * @fileOverview Recipe generation AI agent.
 *
 * - generateRecipe - A function that generates a recipe based on cuisine.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  cuisine: z.string().describe('The type of cuisine to generate a recipe for.'),
  ingredients: z
    .string()
    .optional()
    .describe('The ingredients that should be included in the recipe.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  steps: z.array(z.string()).describe('The step-by-step instructions for the recipe.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a world-class chef, skilled in creating recipes for any cuisine.

  The user will provide you with a cuisine, and optionally a list of ingredients.

  You will generate a recipe with step-by-step instructions, listing out each step clearly.

  Cuisine: {{{cuisine}}}
  {{#if ingredients}}Ingredients: {{{ingredients}}}{{/if}}
  `,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
