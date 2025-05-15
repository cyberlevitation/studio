// @/components/cuisine-crafter/DishNameInput.tsx
'use client';

import type { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DishNameInputProps {
  dishName: string;
  onDishNameChange: (dishName: string) => void;
}

const DishNameInput: FC<DishNameInputProps> = ({ dishName, onDishNameChange }) => {
  return (
    <Card className="p-6 bg-card rounded-xl shadow-lg">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-semibold text-primary">Specific Dish in Mind?</CardTitle>
        <CardDescription>
          Enter the name of the dish you'd like a recipe for (e.g., "Chicken Alfredo", "Vegetable Stir-fry").
          This helps the AI generate a more specific recipe. Leave blank to let the AI choose based on cuisine.
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
        />
      </CardContent>
    </Card>
  );
};

export default DishNameInput;
