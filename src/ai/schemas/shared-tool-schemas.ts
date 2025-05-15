
// @/ai/schemas/shared-tool-schemas.ts
import {z} from 'genkit';

// Schemas for FindLocalRestaurantsTool
export const FindLocalRestaurantsInputSchema = z.object({
  recipeName: z.string().describe('The name of the dish to find in local restaurants. For example, if the dish is "Pizza", it might return "Luigi\'s Pizzeria".'),
  location: z.string().describe('The city and state for the restaurant search, e.g., "New York, NY".'),
});
export type FindLocalRestaurantsInput = z.infer<typeof FindLocalRestaurantsInputSchema>;

export const FindLocalRestaurantsOutputSchema = z.array(
  z.object({
    name: z.string().describe('The name of the restaurant.'),
    url: z.string().url().describe('A URL to the restaurant\'s website or ordering page.'),
    description: z.string().optional().describe('A brief description of the restaurant or why it was chosen.')
  })
);
export type FindLocalRestaurantsOutput = z.infer<typeof FindLocalRestaurantsOutputSchema>;


// Schemas for FindVideoTutorialsTool
export const FindVideoTutorialsInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to find video tutorials for. For example, if the recipe is "Apple Pie", it might return "How to Make Classic Apple Pie".'),
});
export type FindVideoTutorialsInput = z.infer<typeof FindVideoTutorialsInputSchema>;

export const FindVideoTutorialsOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the video tutorial.'),
    url: z.string().url().describe('A URL to the video tutorial (e.g., YouTube).'),
    channelName: z.string().optional().describe('The name of the channel that published the video.'),
  })
);
export type FindVideoTutorialsOutput = z.infer<typeof FindVideoTutorialsOutputSchema>;

// Schemas for SuggestMealsFlow
export const SuggestMealsInputSchema = z.object({
  ingredients: z.string().describe('A comma-separated string of ingredients the user has.'),
});

export const SuggestMealsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      name: z.string().describe('The name of the suggested meal.'),
      description: z.string().optional().describe('A brief 1-2 sentence description of the meal, highlighting how it uses the provided ingredients.'),
    })
  ).describe('A list of 3-5 meal suggestions.'),
});
