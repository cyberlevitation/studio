import type { LucideIcon } from 'lucide-react';
import { Apple, Utensils, Pizza, Soup, Salad, Fish, Wheat, Leaf, Drumstick, Grape, Coffee, Sandwich, Beef, Carrot, Sprout } from 'lucide-react';

export interface Cuisine {
  id: string;
  name: string;
  icon: LucideIcon;
  keywords: string[];
}

export const cuisines: Cuisine[] = [
  { id: 'italian', name: 'Italian', icon: Pizza, keywords: ['italian', 'pasta', 'pizza', 'rome', 'lasagna'] },
  { id: 'mexican', name: 'Mexican', icon: Sandwich, keywords: ['mexican', 'taco', 'burrito', 'spicy', 'quesadilla'] }, // Sandwich for taco/burrito shape
  { id: 'indian', name: 'Indian', icon: Soup, keywords: ['indian', 'curry', 'naan', 'spicy', 'biryani', 'lentil'] },
  { id: 'chinese', name: 'Chinese', icon: Carrot, keywords: ['chinese', 'stir-fry', 'noodles', 'dumplings', 'rice'] }, // Carrot for common stir-fry ingredient
  { id: 'japanese', name: 'Japanese', icon: Fish, keywords: ['japanese', 'sushi', 'ramen', 'teriyaki', 'tempura'] },
  { id: 'french', name: 'French', icon: Grape, keywords: ['french', 'pastry', 'cheese', 'wine', 'croissant', 'ratatouille'] },
  { id: 'greek', name: 'Greek', icon: Salad, keywords: ['greek', 'mediterranean', 'feta', 'olive', 'moussaka'] },
  { id: 'thai', name: 'Thai', icon: Leaf, keywords: ['thai', 'curry', 'spicy', 'coconut', 'pad thai', 'lemongrass'] },
  { id: 'spanish', name: 'Spanish', icon: Utensils, keywords: ['spanish', 'paella', 'tapas', 'sangria', 'gazpacho'] },
  { id: 'american', name: 'American', icon: Apple, keywords: ['american', 'burger', 'bbq', 'comfort', 'hot dog', 'fries'] },
  { id: 'mediterranean', name: 'Mediterranean', icon: Sprout, keywords: ['mediterranean', 'healthy', 'olive oil', 'hummus', 'tabbouleh'] }, // Sprout for fresh/healthy
  { id: 'vietnamese', name: 'Vietnamese', icon: Soup, keywords: ['vietnamese', 'pho', 'spring roll', 'fresh', 'banh mi'] },
  { id: 'korean', name: 'Korean', icon: Drumstick, keywords: ['korean', 'kimchi', 'bbq', 'spicy', 'bibimbap'] },
  { id: 'brazilian', name: 'Brazilian', icon: Coffee, keywords: ['brazilian', 'feijoada', 'churrasco', 'tropical', 'pão de queijo'] },
  { id: 'german', name: 'German', icon: Beef, keywords: ['german', 'sausage', 'pretzel', 'beer', 'schnitzel'] }, // Beef for sausage/meat heavy
  { id: 'middle_eastern', name: 'Middle Eastern', icon: Wheat, keywords: ['middle eastern', 'hummus', 'falafel', 'kebab', 'pita'] },
  { id: 'caribbean', name: 'Caribbean', icon: Fish, keywords: ['caribbean', 'jerk chicken', 'rice and peas', 'plantain', 'tropical'] },
  { id: 'african', name: 'African', icon: Utensils, keywords: ['african', 'jollof rice', 'tagine', 'injera', 'stew'] },
];
