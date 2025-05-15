
// @/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ChefHat } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils'; // Import cn for conditional classes

import CuisineSelector from '@/components/cuisine-crafter/CuisineSelector';
import DishNameInput from '@/components/cuisine-crafter/DishNameInput';
import IngredientInput from '@/components/cuisine-crafter/IngredientInput';
import RecipeDisplay from '@/components/cuisine-crafter/RecipeDisplay';
import MealSuggestionsDisplay from '@/components/cuisine-crafter/MealSuggestionsDisplay';

import { handleGenerateRecipeAction, handleSuggestMealsAction } from '@/app/actions';
import type { GenerateRecipeOutput, SuggestMealsOutput } from '@/app/actions';


export default function MamaCookPage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [dishName, setDishName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false);
  const [recipeError, setRecipeError] = useState<string | null>(null);

  const [mealSuggestions, setMealSuggestions] = useState<SuggestMealsOutput['suggestions'] | null>(null);
  const [isSuggestingMeals, setIsSuggestingMeals] = useState<boolean>(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);


  const handleCuisineSelect = (cuisineName: string) => {
    setSelectedCuisine(cuisineName);
    setRecipe(null); 
    setRecipeError(null);
  };

  const handleDishNameChange = (newDishName: string) => {
    setDishName(newDishName);
  };

  const handleIngredientsChange = (newIngredients: string) => {
    setIngredients(newIngredients);
    // Clear previous suggestions if ingredients change
    if (mealSuggestions) setMealSuggestions(null);
    if (suggestionsError) setSuggestionsError(null);
  };

  const handleSuggestMeals = async () => {
    if (!ingredients.trim()) {
      toast({
        title: "No Ingredients",
        description: "Please enter some ingredients to get meal suggestions.",
        variant: "default",
      });
      return;
    }
    setIsSuggestingMeals(true);
    setSuggestionsError(null);
    setMealSuggestions(null);

    try {
      const result = await handleSuggestMealsAction({ ingredients });
      setMealSuggestions(result.suggestions);
      if (result.suggestions.length > 0) {
        toast({
          title: "Meal Ideas Ready!",
          description: "Check out the suggestions based on your ingredients.",
        });
      } else {
         toast({
          title: "No Specific Suggestions",
          description: "Couldn't find specific meal suggestions for the provided ingredients. Try adding more or different items!",
          variant: "default"
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setSuggestionsError(errorMessage);
      toast({
        title: "Error Suggesting Meals",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSuggestingMeals(false);
    }
  };

  const handleSuggestionClick = (mealName: string) => {
    setDishName(mealName);
    // Optionally clear meal suggestions after one is picked, or keep them visible
    // setMealSuggestions(null); 
    toast({
      title: "Dish Name Updated",
      description: `"${mealName}" is now set as the dish to get a recipe for.`,
    });
  };

  const handleGenerateRecipe = async () => {
    setIsLoadingRecipe(true);
    setRecipeError(null);
    setRecipe(null); 

    try {
      const result = await handleGenerateRecipeAction({ 
        cuisine: selectedCuisine || undefined, 
        dishName, 
        ingredients 
      });
      setRecipe(result);
      toast({
        title: "Recipe Generated!",
        description: `Enjoy your ${result.recipeName}.`,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setRecipeError(errorMessage);
      toast({
        title: "Error Generating Recipe",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const suggestedDishNamesForInput = mealSuggestions?.map(s => s.name);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <header className="py-8 px-4 text-center shadow-md bg-card sticky top-0 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <ChefHat className="w-16 h-16 text-primary" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
              MamaCook
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Your AI-Powered Culinary Assistant
            </p>
          </div>
        </div>
      </header>
      
      <Image 
        src="https://placehold.co/1200x300.png" 
        alt="Culinary ingredients banner" 
        width={1200} 
        height={300}
        className="w-full object-cover h-48 md:h-64"
        data-ai-hint="food cooking"
        priority
      />

      <main className="container mx-auto p-4 sm:p-8 flex-grow w-full max-w-6xl">
        <div className="space-y-8">
          <CuisineSelector
            selectedCuisine={selectedCuisine}
            onCuisineSelect={handleCuisineSelect}
          />

          <DishNameInput
            dishName={dishName}
            onDishNameChange={handleDishNameChange}
            suggestedDishNames={suggestedDishNamesForInput}
          />

          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={handleIngredientsChange}
            onSuggestMeals={handleSuggestMeals}
            isSuggestingMeals={isSuggestingMeals}
            canSuggestMeals={!!ingredients.trim()}
          />
          
          <MealSuggestionsDisplay
            suggestions={mealSuggestions}
            isLoading={isSuggestingMeals}
            error={suggestionsError}
            onSuggestionClick={handleSuggestionClick}
            selectedDishName={dishName} // Pass current dishName to highlight
          />


          <div className="text-center pt-4"> {/* Added padding top for separation */}
            <Button
              onClick={handleGenerateRecipe}
              disabled={isLoadingRecipe}
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200"
              aria-live="polite"
            >
              {isLoadingRecipe ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Crafting Recipe...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </div>

          <RecipeDisplay recipe={recipe} isLoading={isLoadingRecipe} error={recipeError} />
        </div>
      </main>

      <footer className="mt-12 py-8 text-center text-sm text-muted-foreground border-t border-border bg-card">
        <p>&copy; {new Date().getFullYear()} MamaCook. All rights reserved.</p>
        <p>Powered by Generative AI. Check out our <Link href="/blog" className="text-primary hover:underline">Blog</Link>!</p>
      </footer>
    </div>
  );
}
