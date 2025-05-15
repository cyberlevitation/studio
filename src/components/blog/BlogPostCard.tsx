
// @/components/blog/BlogPostCard.tsx
'use client';

import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      {post.imageUrl && (
        <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageAiHint || 'food blog'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      <CardHeader className="p-4 sm:p-6">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-primary leading-tight">
            {post.title}
          </CardTitle>
        </Link>
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-2">
          <CalendarDays className="w-4 h-4 mr-1.5" />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 flex-grow">
        <CardDescription className="text-sm sm:text-base text-foreground/80 line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-3 sm:mb-0">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
        <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-accent-foreground self-end sm:self-center">
          <Link href={`/blog/${post.slug}`}>
            Read More &rarr;
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
