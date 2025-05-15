// @/components/cuisine-crafter/CuisineCard.tsx
'use client';

import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Cuisine } from '@/lib/cuisines';
import { cn } from '@/lib/utils';

interface CuisineCardProps {
  cuisine: Cuisine;
  onSelect: (cuisineName: string) => void;
  isSelected: boolean;
}

const CuisineCard: FC<CuisineCardProps> = ({ cuisine, onSelect, isSelected }) => {
  const IconComponent = cuisine.icon;

  return (
    <Card
      className={cn(
        'cursor-pointer hover:shadow-lg transition-shadow duration-200',
        isSelected ? 'ring-2 ring-primary border-primary' : 'border-border',
        'flex flex-col items-center text-center p-4 rounded-lg shadow-md hover:bg-accent/20'
      )}
      onClick={() => onSelect(cuisine.name)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(cuisine.name);
        }
      }}
      aria-pressed={isSelected}
    >
      <CardHeader className="p-2">
        <IconComponent className="w-12 h-12 text-primary mb-2" />
      </CardHeader>
      <CardContent className="p-2">
        <CardTitle className="text-lg font-semibold">{cuisine.name}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default CuisineCard;
