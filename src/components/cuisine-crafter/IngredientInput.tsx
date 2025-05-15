
// @/components/cuisine-crafter/IngredientInput.tsx
'use client';

import type { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string;
  onIngredientsChange: (ingredients: string) => void;
  onSuggestMeals: () => void;
  isSuggestingMeals: boolean;
  canSuggestMeals: boolean;
}

const IngredientInput: FC<IngredientInputProps> = ({
  ingredients,
  onIngredientsChange,
  onSuggestMeals,
  isSuggestingMeals,
  canSuggestMeals
}) => {
  return (
    <Card className="p-6 bg-card rounded-xl shadow-lg">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-semibold text-primary">Have Ingredients?</CardTitle>
        <CardDescription>
          List ingredients you have on hand, separated by commas (optional).
          This helps tailor recipe suggestions!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div>
          <Label htmlFor="ingredients" className="sr-only">Available Ingredients</Label>
          <Textarea
            id="ingredients"
            placeholder="e.g., chicken breast, broccoli, soy sauce"
            value={ingredients}
            onChange={(e) => onIngredientsChange(e.target.value)}
            rows={4}
            className="resize-none focus:ring-primary"
          />
        </div>
        <div className="text-right">
          <Button
            onClick={onSuggestMeals}
            disabled={isSuggestingMeals || !canSuggestMeals}
            variant="outline"
            size="sm"
          >
            {isSuggestingMeals ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suggesting...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Suggest Meals
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredientInput;
