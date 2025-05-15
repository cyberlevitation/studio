
// @/app/actions.ts
'use server';

import { generateRecipe, type GenerateRecipeInput, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { suggestMealsFromIngredients, type SuggestMealsInput, type SuggestMealsOutput } from '@/ai/flows/suggest-meals-flow';

export async function handleGenerateRecipeAction(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  try {
    const recipe = await generateRecipe(input);
    if (!recipe || !recipe.recipeName || !recipe.steps || recipe.steps.length === 0) {
      throw new Error('The generated recipe was incomplete. Please try again.');
    }
    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate recipe: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the recipe.');
  }
}

export async function handleSuggestMealsAction(input: SuggestMealsInput): Promise<SuggestMealsOutput> {
  try {
    const mealSuggestions = await suggestMealsFromIngredients(input);
    if (!mealSuggestions || !mealSuggestions.suggestions) {
      // Even if suggestions array is empty, it's a valid response.
      // We only throw if the structure itself is missing.
      throw new Error('The AI returned an invalid format for meal suggestions.');
    }
    return mealSuggestions;
  } catch (error) {
    console.error('Error suggesting meals:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to suggest meals: ${error.message}`);
    }
    throw new Error('An unknown error occurred while suggesting meals.');
  }
}

// Export types for use in client components
export type { GenerateRecipeInput, GenerateRecipeOutput, SuggestMealsInput, SuggestMealsOutput };
