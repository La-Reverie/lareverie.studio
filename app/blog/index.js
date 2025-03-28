import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import TopMenu from '../../components/TopMenu';
import Footer from '../../components/Footer';
import config from '../../config';

const blogPrefix = config.blogPrefix;

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'blog'));

  const posts = files.map((filename) => {
    const filePath = path.join(process.cwd(), 'blog', filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: metadata, content } = matter(fileContent);

    const description = metadata.description || content.split('\n').find((line) => line.trim());
    const category = metadata.category || 'Uncategorized';

    return {
      slug: filename.replace('.md', ''),
      ...metadata,
      description,
      category,
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const categories = [...new Set(posts.map((post) => post.category))];

  return {
    props: {
      posts,
      categories,
    },
  };
}

const BlogIndex = ({ posts, categories }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeCategory, setActiveCategory] = useState('All');

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category));
    }
  };

  return (
    <div>
      <TopMenu />
      <section
        id="blog"
        className="flex flex-col pt-[180px] md:mt-0 pb-[80px] md:pt-[150px] lg:pt-[190px] min-h-screen bg-gray-100 px-4 text-center"
      >
        <h1 className="text-5xl lg:text-6xl font-bold lg:mt-9 mb-4 text-blue-500 font-condensed">Our Blog</h1>
        <p className="text-xl md:text-xl xl:text-3xl font-light text-blue-400 max-w-4xl mx-auto mb-10 font-condensed">
          Discover expert insights, restoration tips, and real success stories in our blog. From water damage recovery to fire restoration solutions, we’re here to guide you through every step of the process. Learn how we help restore not just properties, but also peace of mind for families and businesses alike.
        </p>

        <hr className="w-1/2 mx-auto mb-8 border-blue-200" />

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto text-left">
          {/* Lista de publicaciones */}
          <ul className="space-y-6 w-full md:w-2/3">
            {filteredPosts.map((post) => (
              <li
                key={post.slug}
                className="p-4   rounded-lg transition-transform"
              >
                <Link href={`${blogPrefix}/${post.slug}`} passHref>
                  <h2 className="text-3xl lg:text-4xl capitalize font-bold text-gray-600 font-condensed">
                    {post.title}
                  </h2>
                  <p className="text-lg mb-2 text-gray-500">{post.date} {post.category}</p>
                </Link>
                <p className="text-gray-600 text-lg">{post.description}</p>
                
              </li>
            ))}
          </ul>

          {/* Sidebar de categorías */}
          <aside className="hidden md:block w-1/3  rounded-lg p-4">
            <h3 className="text-xl xl:text-2xl font-bold mb-4 font-condensed">Categories</h3>
            <ul className="space-y-2 text-lg">
              <li>
                <button
                  className={`text-gray-600 cursor-pointer block  px-2 ${
                    activeCategory === 'All' ? 'bg-blue-400 rounded text-white px-2' : ''
                  }`}
                  onClick={() => filterByCategory('All')}
                >
                  All
                </button>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    className={`text-gray-600 cursor-pointer px-2 ${
                      activeCategory === category ? 'bg-blue-400 rounded text-white px-2' : ''
                    }`}
                    onClick={() => filterByCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogIndex;