import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, '')
  }));
}

async function getPost(slug) {
  try {
    const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    
    return {
      slug,
      ...data,
      content: processedContent.toString()
    };
  } catch (error) {
    return notFound();
  }
}

import Header from '../../components/Header';
import Link from 'next/link';
// Remove the Heroicons import

// Add this function to get the next post
async function getNextPost(currentSlug) {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Sort posts by date if needed
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: filename.replace(/\.md$/, ''),
      ...data
    };
  });
  
  // Find current post index
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  // Return next post if exists
  if (currentIndex !== -1 && currentIndex < posts.length - 1) {
    return posts[currentIndex + 1];
  }
  
  return null;
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  const nextPost = await getNextPost(params.slug);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 mt-14">
      <Header />
      
      <main className="w-full pt-16">
        <article>
          {/* Title section - left aligned with larger text */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center space-x-4 text-xl text-gray-300">
              <span className="text-blue-300">{post.category}</span>
              <span>•</span>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>

          {/* Featured image - full width */}
          {post.featured_image && (
            <div className="w-full mb-16">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-[50vh] md:h-[70vh] object-cover"
              />
            </div>
          )}
          
          {/* Two-column layout for author and content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Author column - left side */}
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <div className="sticky top-24">
                  <div className="flex md:flex-col items-center md:items-start space-x-4 md:space-x-0 md:space-y-4 border-t border-blue-800/30 pt-6">
                    <div className="h-16 w-16 rounded-full bg-blue-400 flex items-center justify-center font-bold text-blue-900">
                      {post.author?.charAt(0) || 'A'}
                    </div>
                    <div className="md:mt-4">
                      <p className="text-white font-medium text-xl">{post.author || 'La Reverie Team'}</p>
                      <p className="text-gray-300 text-lg">La Reverie Studio</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block mt-8 text-gray-300 text-lg">
                    <p>Team Member</p>
                    <div className="mt-6 border-t border-blue-800/30 pt-6">
                      <p className="text-white font-medium mb-2">Share this article</p>
                      <div className="flex space-x-4">
                        <a 
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://lareverie.studio'}/blog/${post.slug}`)}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-300 hover:text-white"
                        >
                          Twitter
                        </a>
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://lareverie.studio'}/blog/${post.slug}`)}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-300 hover:text-white"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content column - right side */}
              <div className="w-full md:w-3/4">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-xl [&>h1]:text-5xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-12 [&>h1]:mb-6
                              [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-blue-300 [&>h2]:mt-12 [&>h2]:mb-4
                              [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-teal-300 [&>h3]:mt-8 [&>h3]:mb-3
                              [&>p]:text-gray-200 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-xl
                              [&>blockquote]:border-l-2 [&>blockquote]:border-blue-400 [&>blockquote]:pl-4 [&>blockquote]:text-gray-300
                              [&>blockquote]:my-8 [&>blockquote]:py-2 [&>blockquote]:bg-blue-900/20 [&>blockquote]:rounded-r-md
                              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-gray-200 [&>ul>li]:text-xl
                              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-gray-200 [&>ol>li]:text-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation - centered at the bottom */}
            <div className="pb-12 pt-8 border-t border-blue-800/30 text-center">
              <div className="flex justify-center items-center space-x-12 text-xl mb-16">
                <Link href="/blog" className="text-blue-300 hover:text-white">
                  ← All Stories
                </Link>
                
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="text-blue-300 hover:text-white">
                    Next: {nextPost.title.substring(0, 20)}
                    {nextPost.title.length > 20 ? '...' : ''} →
                  </Link>
                ) : (
                  <Link href="/blog" className="text-blue-300 hover:text-white">
                    More Stories →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}