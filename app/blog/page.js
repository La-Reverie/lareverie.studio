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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-20 mt-12">
        <header className="mb-16 text-center">
          <h1 className="mb-6 text-6xl tracking-wide text-white">
            La Reverie Blog
          </h1>
          <p className="text-xl text-gray-200">
            Stories about design, technology, and creative process
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="group overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm transition-all hover:bg-black/40"
            >
              <Link href={`/blog/${post.slug}`} className="block p-8">
                <div className="flex flex-col md:flex-row md:items-center">
                  {/* Featured image (if available) */}
                  {post.featured_image && (
                    <div className="mb-6 md:mb-0 md:mr-8 md:w-1/3">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="h-48 w-full rounded-xl object-cover duration-300 shadow-lg transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  {/* Post content */}
                  <div className={post.featured_image ? "md:w-2/3" : "w-full"}>
                    <div className="mb-3 flex items-center space-x-4">
                      <time className="text-sm text-blue-300">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm uppercase tracking-wider text-blue-300">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="mb-4 text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="mb-6 text-lg leading-relaxed text-gray-300">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center">
                      <span className="inline-block rounded-full bg-blue-600/20 px-4 py-2 text-blue-300 transition-colors group-hover:bg-blue-600/30 group-hover:text-blue-200">
                        Read article →
                      </span>
                    </div>
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