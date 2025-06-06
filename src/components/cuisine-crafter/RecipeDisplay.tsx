
// @/components/cuisine-crafter/RecipeDisplay.tsx
'use client';

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, Store, Youtube, ExternalLink, ShoppingBasket, ListChecks } from 'lucide-react';
import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Button } from '@/components/ui/button';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput | null;
  isLoading: boolean;
  error: string | null;
}

const RecipeDisplay: FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  const renderStepWithLinks = (stepText: string) => {
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Sanitize URL to prevent javascript: pseudo-protocol or other dangerous URLs
    const sanitizedHtml = stepText.replace(markdownLinkRegex, (match, text, url) => {
      let G_URL;
      try {
        G_URL = new URL(url); // Use global URL
        if (!['http:', 'https:', 'mailto:'].includes(G_URL.protocol)) {
          // If protocol is not safe, render as plain text
          return match; 
        }
      } catch (e) {
        // Invalid URL, render as plain text
        return match;
      }
      return `<a href="${encodeURI(url)}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${text}</a>`;
    });
    return <span dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  };


  if (isLoading) {
    return (
      <Card className="w-full p-6 shadow-lg rounded-xl">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-1/3 mb-2" /> {/* For Ingredients title */}
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          
          <Skeleton className="h-6 w-1/3 mt-4 mb-2" /> {/* For Instructions title */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />

          <Skeleton className="h-8 w-1/3 mt-4" /> {/* For restaurant/video titles */}
          <Skeleton className="h-6 w-full" />
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

  const hasRestaurantLinks = recipe.restaurantLinks && recipe.restaurantLinks.length > 0;
  const hasVideoTutorialLinks = recipe.videoTutorialLinks && recipe.videoTutorialLinks.length > 0;
  const hasIngredients = recipe.ingredients && recipe.ingredients.length > 0;

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
        {hasIngredients && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center">
              <ShoppingBasket className="w-6 h-6 mr-2 text-primary" />
              Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 pl-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="py-1 px-2 bg-background/50 shadow-sm rounded-md">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center">
            <ListChecks className="w-6 h-6 mr-2 text-primary" />
            Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-foreground/90 mb-8">
            {recipe.steps.map((step, index) => (
              <li key={index} className="pl-2 border-l-2 border-accent rounded-r-md py-1 bg-background/50 shadow-sm">
                {renderStepWithLinks(step)}
              </li>
            ))}
          </ol>
        </div>

        {hasRestaurantLinks && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center">
              <Store className="w-6 h-6 mr-2 text-primary" />
              Order Out
            </h3>
            <div className="space-y-2">
              {recipe.restaurantLinks?.map((link, index) => (
                <Card key={index} className="p-3 bg-background/70 shadow-sm hover:shadow-md transition-shadow">
                  <CardTitle className="text-lg mb-1">{link.name}</CardTitle>
                  {link.description && <CardDescription className="text-sm mb-2">{link.description}</CardDescription>}
                  <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:text-accent-foreground">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {hasVideoTutorialLinks && (
          <div>
            <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center">
              <Youtube className="w-6 h-6 mr-2 text-red-600" />
              Watch Tutorials
            </h3>
            <div className="space-y-2">
              {recipe.videoTutorialLinks?.map((link, index) => (
                <Card key={index} className="p-3 bg-background/70 shadow-sm hover:shadow-md transition-shadow">
                   <CardTitle className="text-lg mb-1">{link.title}</CardTitle>
                  {link.channelName && <CardDescription className="text-sm text-muted-foreground mb-2">Channel: {link.channelName}</CardDescription>}
                  <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:text-accent-foreground">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      Watch Video <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {(hasRestaurantLinks || hasVideoTutorialLinks) && (
         <CardFooter className="mt-6 text-xs text-muted-foreground">
            <p>Restaurant and video links are suggestions and may be based on mock data for demonstration.</p>
         </CardFooter>
      )}
    </Card>
  );
};

export default RecipeDisplay;

