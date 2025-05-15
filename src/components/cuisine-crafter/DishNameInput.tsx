
// @/components/cuisine-crafter/DishNameInput.tsx
'use client';

import type { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DishNameInputProps {
  dishName: string;
  onDishNameChange: (dishName: string) => void;
  suggestedDishNames?: string[];
}

const DishNameInput: FC<DishNameInputProps> = ({ dishName, onDishNameChange, suggestedDishNames }) => {
  const datalistId = "dishName-datalist";
  return (
    <Card className="p-6 bg-card rounded-xl shadow-lg">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-semibold text-primary">Specific Dish in Mind?</CardTitle>
        <CardDescription>
          Enter the name of the dish you'd like a recipe for (e.g., "Chicken Alfredo", "Vegetable Stir-fry").
          This helps the AI generate a more specific recipe. Leave blank to let the AI choose based on cuisine.
          If meal suggestions are available, they will appear as autocomplete options.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Label htmlFor="dishName" className="sr-only">Dish Name</Label>
        <Input
          id="dishName"
          placeholder="e.g., Lasagna, Pad Thai..."
          value={dishName}
          onChange={(e) => onDishNameChange(e.target.value)}
          className="focus:ring-primary"
          list={suggestedDishNames && suggestedDishNames.length > 0 ? datalistId : undefined}
        />
        {suggestedDishNames && suggestedDishNames.length > 0 && (
          <datalist id={datalistId}>
            {suggestedDishNames.map(name => (
              <option key={name} value={name} />
            ))}
          </datalist>
        )}
      </CardContent>
    </Card>
  );
};

export default DishNameInput;
