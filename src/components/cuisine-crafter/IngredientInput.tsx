// @/components/cuisine-crafter/IngredientInput.tsx
'use client';

import type { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface IngredientInputProps {
  ingredients: string;
  onIngredientsChange: (ingredients: string) => void;
}

const IngredientInput: FC<IngredientInputProps> = ({ ingredients, onIngredientsChange }) => {
  return (
    <Card className="p-6 bg-card rounded-xl shadow-lg">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-semibold text-primary">Have Ingredients?</CardTitle>
        <CardDescription>
          List ingredients you have on hand, separated by commas (optional).
          This helps tailor recipe suggestions!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Label htmlFor="ingredients" className="sr-only">Available Ingredients</Label>
        <Textarea
          id="ingredients"
          placeholder="e.g., chicken breast, broccoli, soy sauce"
          value={ingredients}
          onChange={(e) => onIngredientsChange(e.target.value)}
          rows={4}
          className="resize-none focus:ring-primary"
        />
      </CardContent>
    </Card>
  );
};

export default IngredientInput;
