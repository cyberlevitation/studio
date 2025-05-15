
// @/app/blog/page.tsx
import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CuisineCrafter Blog | Culinary Tips & Recipes',
  description: 'Explore delicious recipes, cooking tips, and culinary inspiration from the CuisineCrafter blog.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 px-4 text-center shadow-md bg-card sticky top-0 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-primary tracking-tight">
              CuisineCrafter Blog
            </h1>
            <p className="text-md sm:text-lg text-muted-foreground mt-1">
              Culinary Tips, Tricks, and Inspiration
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-8">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-12 py-8 text-center text-sm text-muted-foreground border-t border-border bg-card">
        <p>&copy; {new Date().getFullYear()} CuisineCrafter Blog. All rights reserved.</p>
        <p>
          <a href="/" className="text-primary hover:underline">Back to CuisineCrafter Home</a>
        </p>
      </footer>
    </div>
  );
}
