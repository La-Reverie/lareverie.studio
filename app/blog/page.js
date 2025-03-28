import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Header from '../components/Header';

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace(/\.md$/, ''),
      ...data
    };
  });
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default async function Blog() {
  const posts = await getPosts();
  
  // Get the featured post (first/newest post)
  const featuredPost = posts[0];
  // Get the rest of the posts
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-20 mt-12">
        <header className="mb-16 text-center">
          <h1 className="mb-6 text-6xl tracking-wide text-white">
            La Reverie Blog
          </h1>
          <p className="text-xl text-gray-200">
            Stories about design, technology, and creative process
          </p>
        </header>

        {/* Featured Post - Full Width */}
        {featuredPost && (
          <div className="mb-20">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative h-[60vh] w-full overflow-hidden rounded-3xl">
                <img 
                  src={featuredPost.featured_image} 
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <div className="mb-4 flex items-center space-x-4">
                    <span className="rounded-full bg-blue-500/80 px-4 py-1 text-sm font-medium text-white">
                      {featuredPost.category}
                    </span>
                    <time className="text-sm text-gray-200">
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="mb-4 max-w-3xl text-4xl md:text-5xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="mb-6 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-200">
                    {featuredPost.excerpt}
                  </p>
                  
                  <span className="inline-flex items-center text-blue-300 group-hover:text-blue-200">
                    Read article <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm transition-all hover:bg-black/40 h-full">
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                {/* Image container with fixed height */}
                {post.featured_image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="mb-3 flex items-center space-x-3">
                    <span className="text-xs uppercase tracking-wider text-blue-300">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <time className="text-xs text-gray-300">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="mb-3 text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="mb-6 text-sm leading-relaxed text-gray-300 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-sm text-blue-300 group-hover:text-blue-200">
                      Read article <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}