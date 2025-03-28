import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import TopMenu from "../../components/TopMenu";
import Footer from "../components/Footer";
import config from "../../config";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "blog"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false, // Muestra 404 si no se encuentra
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "blog", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: metadata, content } = matter(fileContent);

  return {
    props: {
      metadata,
      content,
    },
  };
}

const BlogPost = ({ metadata, content }) => {
  const basePrefix = config.basePrefix;

  return (
    <div>
      <TopMenu />

      <section
        id="blog-post"
        className="flex flex-col md:items-center justify-start bg-gray-100 px-4 py-12 min-h-screen pt-[150px] md:pt-[180px]"
      >
        <div className="md:max-w-4xl mx-auto w-full">
          <p className="mt-6 mb-5 md:justify-center flex">
            <a
              href={`${basePrefix}/blog`}
              className="inline items-center text-white hover:text-black border-4 border-transparent hover:border-blue-500 hover:bg-transparent text-lg font-semibold p-1.5 px-2 rounded-lg bg-blue-500"
            >
              <span className="mr-1 text-xl">←</span> Back to Blog
            </a>
          </p>
        </div>

        <div className="max-w-3xl text-lef">
        <p className="text-gray-400 text-md">{metadata.date}</p>
        <h1 className="text-4xl md:text-5xl font-condensed font-semibold text-gray-700 mt-3 mb-4">
          {metadata.title}
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-500 mb-5">
            {metadata.description}
        </h2>
        </div>
        <div className="w-full md:w-auto">
          <article className="prose max-w-3xl text-lg">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-5xl font-condensed font-semibold text-blue-400 mb-3 mt-12"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-3xl font-condensed font-medium text-gray-600 mt-6 mb-1"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-condensed font-medium text-gray-600 mt-6 mb-1"
                      {...props}
                    />
                  ),
                p: ({ node, ...props }) => (
                  <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="text-sm font-mono bg-gray-200 text-black rounded px-1 py-0.5"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6 text-sm"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-gray-700 font-bold" {...props} />
                ),
                ul: ({ node, ...props }) => (
                <ul className="list-disc list-outside mb-6 max-w-[95%]" {...props} />
                ),
                ol: ({ node, ...props }) => (
                <ol className="list-decimal list-outside mb-6" {...props} />
                ),
                li: ({ node, ...props }) => (
                <li className="ml-8 leading-relaxed" {...props} />
                ),
                hr: ({ node, ...props }) => (
                    <hr className="my-10 border-blue-400 border-4 w-[100px] rounded-full mx-auto" {...props} />
                  ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-500 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

        </div>

        <div className="bg-blue-600 md:max-w-[80%] md:w-[900px] mx-auto p-5 md:p-8 rounded-lg text-center mt-5">
            <h2 class="text-white text-2xl md:text-3xl font-semibold">Restoring your home after a disaster is no small task. Trust the experts at Blue Dolphin Restoration to help you navigate the process with care and expertise.</h2>        
            <a href={`${basePrefix}/contact`} className="text-2xl font-condensed font-semibold px-6 py-4 inline-block mt-5 rounded-full bg-white uppercase hover:bg-gray-900 hover:shadow-lg hover:text-white transform-all duration-100 border-white border-4">Get a Free Quote</a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;