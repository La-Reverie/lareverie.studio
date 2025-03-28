//blog.js
const fs = require("fs");
const path = require("path");

const createPost = () => {
  // Grab the arguments from the command line
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Please provide a title for the blog post.");
    process.exit(1);
  }

  // Combine arguments to form the title and slug
  const title = args.join(" ");
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Define the path to save the blog post
  const blogDir = path.join(__dirname, "blog");
  const postPath = path.join(blogDir, `${slug}.md`);

  // Check if the blog directory exists; if not, create it
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir);
  }

  const template = `---
title: "${title}"
date: "${new Date().toISOString().split("T")[0]}"
description: "Write a short description for this blog post."
---

Welcome to your new blog post! This template is here to help you get started with writing content in Markdown. Markdown is simple to learn and use, yet powerful for structuring content. For more Markdown syntax details, check out [this guide](https://www.markdownguide.org/).

---

## Header Examples

### H1 Header
# This is an H1 Header (Primary Title)

### H2 Header
## This is an H2 Header (Subheading)

### H3 Header
### This is an H3 Header (Smaller Section)

### H4 Header
#### This is an H4 Header (Smallest Section)

---

## Text Formatting Examples

- *Italics* using \`*\` or \`_\`
- **Bold** using \`**\` or \`__\`
- ***Bold and Italics*** using \`***\` or \`___\`
- ~~Strikethrough~~ using \`~~\`

---

## List Examples

### Unordered List:
- First item
- Second item
- Third item

### Ordered List:
1. First item
2. Second item
3. Third item

---

## Links and Blockquotes

You can add links like this:  
[Markdown Guide](https://www.markdownguide.org/)

Blockquotes are great for highlighting quotes or important information:

> This is a blockquote. Use it to emphasize key points.

---

## Image Example

Add an image with the following syntax:  
![Sample Image](https://via.placeholder.com/600x400)
\`![Sample Image](https://via.placeholder.com/600x400)\`

Or you can include captions:  
\`![Sample Image with Caption](https://via.placeholder.com/600x400)\`  
![Sample Image with Caption](https://via.placeholder.com/600x400)
*This is a caption for the image above.*

---

## Code Blocks Example

Here’s how to include code snippets:

\`\`\`html
// This is a sample code block
Hello this is a sample code block!
\`\`\`

You can also include inline code like this: \`const x = 42;\`.

---

## Wrapping Up

Start writing your content below this line. This template is designed to give you a head start on structuring your posts. Markdown is flexible, lightweight, and ensures consistent formatting across all posts.
`;

  // Write the Markdown file
  if (fs.existsSync(postPath)) {
    console.error(`A post with the slug "${slug}" already exists.`);
  } else {
    fs.writeFileSync(postPath, template, "utf-8");
    console.log(`Blog post created: ${postPath}`);
  }
};

createPost();