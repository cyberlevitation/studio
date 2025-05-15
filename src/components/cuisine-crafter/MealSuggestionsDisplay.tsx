
// @/components/cuisine-crafter/MealSuggestionsDisplay.tsx
'use client';

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Lightbulb, Zap } from 'lucide-react';
import type { SuggestMealsOutput } from '@/app/actions'; // Updated import path

interface MealSuggestionsDisplayProps {
  suggestions: SuggestMealsOutput['suggestions'] | null;
  isLoading: boolean;
  error: string | null;
  onSuggestionClick: (mealName: string) => void;
}

const MealSuggestionsDisplay: FC<MealSuggestionsDisplayProps> = ({
  suggestions,
  isLoading,
  error,
  onSuggestionClick,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full p-6 shadow-md rounded-xl mt-6">
        <CardHeader>
          <Skeleton className="h-7 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 border rounded-md">
              <Skeleton className="h-5 w-2/3 mb-1" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full p-6 shadow-md rounded-xl mt-6 bg-destructive/10 border-destructive">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <CardTitle className="text-destructive">Error Fetching Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    // Don't display anything if there are no suggestions and not loading/error
    // This could be a specific message if explicitly no suggestions were found.
    // For now, keeping it clean.
    return null;
  }

  return (
    <Card className="w-full p-6 shadow-lg rounded-xl mt-6 bg-accent/5 border-accent">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center">
          <Lightbulb className="w-7 h-7 mr-2 text-yellow-500" />
          Meal Ideas
        </CardTitle>
        <CardDescription>Here are some meal ideas based on your ingredients. Click one to get a recipe!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <Card
            key={index}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-background rounded-lg"
            onClick={() => onSuggestionClick(suggestion.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSuggestionClick(suggestion.name);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Select ${suggestion.name} as dish`}
          >
            <h4 className="font-semibold text-lg text-primary flex items-center">
               <Zap size={18} className="mr-2 text-primary/80" /> {suggestion.name}
            </h4>
            {suggestion.description && <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MealSuggestionsDisplay;
