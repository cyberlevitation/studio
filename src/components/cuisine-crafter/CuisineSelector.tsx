// @/components/cuisine-crafter/CuisineSelector.tsx
'use client';

import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cuisines as allCuisines, type Cuisine } from '@/lib/cuisines';
import CuisineCard from './CuisineCard';
import { ListFilter, SortAsc, SortDesc } from 'lucide-react';

interface CuisineSelectorProps {
  selectedCuisine: string | null;
  onCuisineSelect: (cuisineName: string) => void;
}

type SortOrder = 'asc' | 'desc' | 'default';

const CuisineSelector: FC<CuisineSelectorProps> = ({ selectedCuisine, onCuisineSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  const filteredAndSortedCuisines = useMemo(() => {
    let cuisines = allCuisines.filter(cuisine =>
      cuisine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuisine.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortOrder === 'asc') {
      cuisines.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      cuisines.sort((a, b) => b.name.localeCompare(a.name));
    }
    // 'default' sort is the original order from cuisines.ts
    return cuisines;
  }, [searchTerm, sortOrder]);

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-primary">Choose Your Cuisine</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Filter cuisines (e.g., Italian, spicy)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
          aria-label="Filter cuisines"
        />
        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Sort cuisines">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Order</SelectItem>
            <SelectItem value="asc">
              <span className="flex items-center gap-2"><SortAsc className="w-4 h-4" /> A-Z</span>
            </SelectItem>
            <SelectItem value="desc">
              <span className="flex items-center gap-2"><SortDesc className="w-4 h-4" /> Z-A</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredAndSortedCuisines.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAndSortedCuisines.map((cuisine) => (
            <CuisineCard
              key={cuisine.id}
              cuisine={cuisine}
              onSelect={onCuisineSelect}
              isSelected={selectedCuisine === cuisine.name}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No cuisines match your search. Try a different term!</p>
      )}
    </div>
  );
};

export default CuisineSelector;
