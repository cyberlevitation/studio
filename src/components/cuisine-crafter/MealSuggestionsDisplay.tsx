
// @/components/cuisine-crafter/MealSuggestionsDisplay.tsx
'use client';

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Lightbulb, Zap, CheckSquare } from 'lucide-react';
import type { SuggestMealsOutput } from '@/app/actions'; 
import { cn } from '@/lib/utils';

interface MealSuggestionsDisplayProps {
  suggestions: SuggestMealsOutput['suggestions'] | null;
  isLoading: boolean;
  error: string | null;
  onSuggestionClick: (mealName: string) => void;
  selectedDishName?: string | null; // To identify the currently selected suggestion
}

const MealSuggestionsDisplay: FC<MealSuggestionsDisplayProps> = ({
  suggestions,
  isLoading,
  error,
  onSuggestionClick,
  selectedDishName,
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
    return null;
  }

  return (
    <Card className="w-full p-6 shadow-lg rounded-xl mt-6 bg-accent/5 border-accent">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center">
          <Lightbulb className="w-7 h-7 mr-2 text-yellow-500" />
          Meal Ideas
        </CardTitle>
        <CardDescription>Here are some meal ideas based on your ingredients. Click one to use it for recipe generation!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const isSelected = suggestion.name === selectedDishName;
          return (
            <Card
              key={index}
              className={cn(
                'p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-background rounded-lg border-2',
                isSelected ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-transparent hover:border-primary/50',
              )}
              onClick={() => onSuggestionClick(suggestion.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSuggestionClick(suggestion.name);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Select ${suggestion.name} as dish`}
            >
              <div className="flex items-center justify-between">
                <h4 className={cn(
                    "font-semibold text-lg flex items-center",
                    isSelected ? "text-primary" : "text-foreground"
                )}>
                  {isSelected ? <CheckSquare size={20} className="mr-2 text-primary" /> : <Zap size={18} className="mr-2 text-primary/80" />} 
                  {suggestion.name}
                </h4>
                {/* Optional: Add a visual cue on the right if selected */}
                {/* {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />} */}
              </div>
              {suggestion.description && <p className={cn(
                  "text-sm mt-1",
                  isSelected ? "text-muted-foreground" : "text-muted-foreground"
              )}>{suggestion.description}</p>}
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default MealSuggestionsDisplay;

