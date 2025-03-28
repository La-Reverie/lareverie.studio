'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestPost(sortedPosts[0]);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    
    fetchPosts();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (!latestPost) return null;

  return (
    <section id="blog" className="relative w-full py-12 md:py-20 bg-gray-950 text-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_200%] animate-gradient-x"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-gradient-to-r from-gray-900 via-gray-950 to-black blur-3xl opacity-40"></div>
      </div>

      {/* Full-width title section */}
      <div className="relative container mx-auto px-6 sm:px-12 z-10">
        <motion.div
          className="w-full mb-8 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={cardVariants}
        >
          <h3 className="text-xl md:text-4xl font-medium text-blue-400 mb-2 text-center">
            Our Insights
          </h3>
          <h2 className="text-5xl text-left sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight md:text-center mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              {latestPost.title}
            </span>
          </h2>
        </motion.div>

        {/* Two-column content section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Left column - Excerpt */}
          <motion.div 
            className="space-y-6"
            variants={cardVariants}
          >
            <div className="space-y-6">
              <div className="mb-6">
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mr-2">
                  {latestPost.category}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(latestPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-2xl text-gray-300 mb-8">
                {latestPost.excerpt}
              </p>
              <Link 
                href={`/blog/${latestPost.slug}`}
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity font-bebas"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Right column - Post list */}
          <motion.div 
            className="space-y-6"
            variants={cardVariants}
          >
            <div className="space-y-6 mt-10">
              <ul className="space-y-6">
                {posts.map((post, index) => (
                  <li key={index} className="relative">
                    {index === 0 && (
                      <span className="absolute -top-6 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-1 py-0.5 rounded font-bold font-bebas">
                        Newest
                      </span>
                    )}
                    <Link href={`/blog/${post.slug}`} className="group">
                      <h5 className="text-xl font-semibold group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h5>
                      <div className="flex items-center text-sm text-gray-400 mt-0 font-bebas">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Link 
                  href="/blog"
                  className="inline-block text-blue-300 hover:text-blue-200 font-medium font-bebas"
                >
                  View All Articles →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogSection;