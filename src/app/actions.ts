// @/app/actions.ts
'use server';

import { generateRecipe, type GenerateRecipeInput, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe';

export async function handleGenerateRecipeAction(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  try {
    const recipe = await generateRecipe(input);
    if (!recipe || !recipe.recipeName || !recipe.steps || recipe.steps.length === 0) {
      throw new Error('The generated recipe was incomplete. Please try again.');
    }
    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    // It's better to throw a custom error or a more generic one for the client
    if (error instanceof Error) {
      throw new Error(`Failed to generate recipe: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the recipe.');
  }
}
