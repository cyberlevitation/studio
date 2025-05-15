
// @/lib/blog.ts
import type { LucideIcon } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // e.g., "YYYY-MM-DD"
  excerpt: string;
  content: string; // Simple text content for now
  imageUrl?: string;
  imageAlt?: string;
  imageAiHint?: string;
  tags?: string[];
}

export const blogPostsData: BlogPost[] = [
  {
    slug: '10-tips-for-perfect-pasta',
    title: '10 Essential Tips for Cooking Perfect Pasta Every Time',
    date: '2024-07-28',
    excerpt: 'Unlock the secrets to al dente pasta, flavorful sauces, and common mistakes to avoid. Elevate your Italian night!',
    content: `Cooking pasta might seem simple, but a few key techniques can transform your dish from good to great. Here are 10 essential tips:
1.  **Use a large pot and plenty of water:** Pasta needs room to move freely. Use at least 4-6 quarts of water for every pound of pasta.
2.  **Salt the water generously:** The water should taste like the sea. This is your primary chance to season the pasta itself. Add 1-2 tablespoons of salt per pound of pasta.
3.  **Bring water to a rolling boil:** Don't add pasta prematurely. A vigorous boil helps cook it evenly and prevents sticking.
4.  **Stir immediately and occasionally:** Stir the pasta as soon as you add it to the water, and then a few times during cooking to prevent clumping.
5.  **Cook to al dente:** Follow package directions, but start tasting a minute or two before the recommended time. Pasta should be tender but firm to the bite.
6.  **Reserve pasta water:** Before draining, save about a cup of the starchy cooking water. It's liquid gold for emulsifying and thickening your sauce.
7.  **Don't rinse cooked pasta (usually):** Rinsing removes the starch that helps sauce cling. The only exception is for cold pasta salads.
8.  **Finish cooking pasta in the sauce:** For the last minute or two of cooking, add the al dente pasta directly to your sauce with a splash of pasta water. This allows it to absorb flavor.
9.  **Choose the right pasta shape for your sauce:** Delicate sauces pair well with long, thin pasta, while heartier, chunky sauces are great with short, textured shapes.
10. **Serve immediately:** Pasta is best enjoyed hot, right after it's sauced.

Buon appetito!`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'A delicious bowl of pasta with sauce',
    imageAiHint: 'pasta bowl',
    tags: ['Italian', 'Cooking Tips', 'Pasta'],
  },
  {
    slug: 'exploring-mexican-spices',
    title: 'A Beginner\'s Guide to Essential Mexican Spices',
    date: '2024-07-25',
    excerpt: 'Dive into the vibrant world of Mexican cuisine by understanding its foundational spices. From smoky chipotle to earthy cumin.',
    content: `Mexican cuisine is renowned for its bold and complex flavors, largely thanks to a rich array of spices and chilies. Here are a few essentials to get you started:
-   **Cumin (Comino):** Earthy, warm, and slightly bitter, cumin is a staple in chili powders, adobos, and meat rubs.
-   **Chili Powder (Polvo de Chile):** Typically a blend of ground dried chilies, cumin, oregano, and garlic powder. Varies in heat and flavor.
-   **Mexican Oregano (Orégano Mexicano):** Different from Mediterranean oregano, it has a more citrusy and grassy flavor.
-   **Cilantro (Coriander):** Fresh cilantro leaves are used extensively as a garnish and flavor component. Dried coriander seeds are also used.
-   **Smoked Paprika (Pimentón Ahumado):** Adds a deep, smoky flavor to dishes. Often used in chorizo and stews.
-   **Ancho Chili Powder:** Made from dried poblano peppers, it has a mild heat with sweet, fruity notes.
-   **Chipotle Powder:** Made from smoked and dried jalapeños, it provides a distinctive smoky heat.
-   **Cayenne Pepper (Pimienta de Cayena):** Used for adding a fiery kick to salsas and marinades.

Experiment with these spices to bring authentic Mexican flavors to your kitchen!`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'A collection of colorful Mexican spices',
    imageAiHint: 'spices mexican',
    tags: ['Mexican', 'Spices', 'Flavor Guide'],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find(post => post.slug === slug);
}
