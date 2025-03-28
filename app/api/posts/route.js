import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      // Create slug from filename
      const slug = filename.replace(/\.md$/, '');
      
      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        category: data.category,
        excerpt: data.excerpt || data.description,
        featured_image: data.featured_image
      };
    });
  
  return Response.json(posts);
}