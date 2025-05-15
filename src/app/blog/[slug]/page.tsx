
// @/app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CalendarDays, Tag, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | MamaCook Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.imageAlt || post.title }] : [],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 shadow-sm bg-card sticky top-0 z-10">
        <div className="container mx-auto">
          <Button variant="ghost" asChild className="mb-4 text-primary hover:text-accent-foreground">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8">
        <article className="max-w-3xl mx-auto bg-card shadow-xl rounded-xl p-6 sm:p-10">
          {post.imageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-md">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover"
                data-ai-hint={post.imageAiHint || 'blog feature image'}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1.5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-x-2">
                  <Tag className="w-4 h-4 mr-1" />
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                       prose-headings:text-primary prose-p:text-foreground/90 
                       prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-accent-foreground
                       prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} // Simple newline to <br>
          />

          {/* For more complex content (like markdown), you'd use a parser here instead of dangerouslySetInnerHTML */}
          {/* Example: <ReactMarkdown>{post.content}</ReactMarkdown> */}
        </article>
      </main>
      <footer className="mt-12 py-8 text-center text-sm text-muted-foreground border-t border-border bg-card">
        <p>&copy; {new Date().getFullYear()} MamaCook Blog. All rights reserved.</p>
         <p>
          <Link href="/blog" className="text-primary hover:underline">More Blog Posts</Link> | <a href="/" className="text-primary hover:underline">MamaCook Home</a>
        </p>
      </footer>
    </div>
  );
}
