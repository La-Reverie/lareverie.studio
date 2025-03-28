// buildBlog.js

const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const BlogTemplate = require('./src/components/BlogTemplate');

// Directorio de Markdown y salida
const BLOG_DIR = path.join(__dirname, 'src', 'blog');
const OUTPUT_DIR = path.join(__dirname, 'build', 'blog');

// Función para parsear Markdown
const parseMarkdown = (text) => {
  const match = text.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { metadata: {}, content: text };
  }

  const metadata = match[1]
    .split('\n')
    .reduce((acc, line) => {
      const [key, ...value] = line.split(':');
      acc[key.trim()] = value.join(':').trim();
      return acc;
    }, {});

  const content = match[2];
  return { metadata, content };
};

// Crear el directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Leer todos los archivos .md en /src/blog/
const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'));

files.forEach((file) => {
  const filePath = path.join(BLOG_DIR, file);
  const slug = path.basename(file, '.md');

  // Leer el contenido del archivo Markdown
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { metadata, content } = parseMarkdown(fileContent);

  // Renderizar el componente React a HTML
  const element = React.createElement(BlogTemplate, { content, metadata });
  const html = ReactDOMServer.renderToStaticMarkup(element);

  // Envolver el HTML renderizado en una estructura básica
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${metadata.title}</title>
        <meta name="description" content="${metadata.description}" />
        <link href="/static/css/main.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;

  // Escribir el archivo HTML en /build/blog/
  fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.html`), fullHtml);
});