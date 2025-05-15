// @/components/cuisine-crafter/RecipeDisplay.tsx
'use client';

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput | null;
  isLoading: boolean;
  error: string | null;
}

const RecipeDisplay: FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card className="w-full p-6 shadow-lg rounded-xl">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="shadow-lg rounded-xl">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Oops! Something went wrong.</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!recipe) {
    return (
       <Card className="w-full p-6 text-center bg-card shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-muted-foreground">Ready to Cook?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a cuisine and optionally list your ingredients, then click "Generate Recipe" to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 shadow-lg rounded-xl bg-gradient-to-br from-card to-accent/10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary flex items-center">
          <CheckCircle2 className="w-8 h-8 mr-3 text-accent-foreground" />
          {recipe.recipeName}
        </CardTitle>
        <CardDescription className="text-md">
          Here's your custom-generated recipe. Enjoy your meal!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-3 text-foreground">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-3 text-foreground/90">
          {recipe.steps.map((step, index) => (
            <li key={index} className="pl-2 border-l-2 border-accent rounded-r-md py-1 bg-background/50 shadow-sm">
              {step}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default RecipeDisplay;
