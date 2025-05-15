// @/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ChefHat } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import CuisineSelector from '@/components/cuisine-crafter/CuisineSelector';
import IngredientInput from '@/components/cuisine-crafter/IngredientInput';
import RecipeDisplay from '@/components/cuisine-crafter/RecipeDisplay';
import { handleGenerateRecipeAction } from '@/app/actions';
import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';

export default function CuisineCrafterPage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string>('');
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure client-side only logic runs after mount to avoid hydration issues
  }, []);


  const handleCuisineSelect = (cuisineName: string) => {
    setSelectedCuisine(cuisineName);
    setRecipe(null); // Clear previous recipe when new cuisine is selected
    setError(null);
  };

  const handleIngredientsChange = (newIngredients: string) => {
    setIngredients(newIngredients);
  };

  const handleGenerate = async () => {
    if (!selectedCuisine) {
      setError("Please select a cuisine first.");
      toast({
        title: "Missing Cuisine",
        description: "You need to select a cuisine to generate a recipe.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null); // Clear previous recipe before fetching new one

    try {
      const result = await handleGenerateRecipeAction({ cuisine: selectedCuisine, ingredients });
      setRecipe(result);
      toast({
        title: "Recipe Generated!",
        description: `Enjoy your ${result.recipeName}.`,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Error Generating Recipe",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    // Render a simple loading state or null during server-side rendering & before hydration
    // This helps prevent hydration mismatches with components that rely on client-side state/hooks
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <header className="py-8 px-4 text-center shadow-md bg-card sticky top-0 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <ChefHat className="w-16 h-16 text-primary" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
              CuisineCrafter
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

          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={handleIngredientsChange}
          />

          <div className="text-center">
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !selectedCuisine}
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200"
              aria-live="polite"
            >
              {isLoading ? (
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

          <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
        </div>
      </main>

      <footer className="mt-12 py-8 text-center text-sm text-muted-foreground border-t border-border bg-card">
        <p>&copy; {new Date().getFullYear()} CuisineCrafter. All rights reserved.</p>
        <p>Powered by Generative AI.</p>
      </footer>
    </div>
  );
}
