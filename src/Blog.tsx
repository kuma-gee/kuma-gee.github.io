import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface BlogPost {
  slug: string;
  url: string;
  meta: BlogMeta;
  content: string;
}

type BlogSource = {
  slug: string;
  url: string;
};

type WebpackRequire = NodeRequire & {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (id: string): string;
  };
};

const blogContext = (require as WebpackRequire).context(
  "./blogs",
  false,
  /\.md$/
);

const blogSources: BlogSource[] = blogContext.keys().map((path) => ({
  slug: path.replace("./", "").replace(/\.md$/, ""),
  url: blogContext(path),
}));

const emptyMeta: BlogMeta = {
  title: "Untitled",
  date: "",
  excerpt: "",
  tags: [],
};

function parseFrontmatter(raw: string): { data: Partial<BlogMeta>; content: string } {
  if (!raw.startsWith("---\n")) {
    return { data: {}, content: raw };
  }

  const endMarker = "\n---\n";
  const end = raw.indexOf(endMarker, 4);

  if (end === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(4, end);
  const content = raw.slice(end + endMarker.length);
  const data: Partial<BlogMeta> = {};

  for (const line of frontmatter.split("\n")) {
    const separator = line.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (key === "title" || key === "date" || key === "excerpt") {
      data[key] = value.replace(/^"|"$/g, "");
    }

    if (key === "tags") {
      data.tags = value
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((tag) => tag.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    }
  }

  return { data, content };
}

async function loadBlog(source: BlogSource): Promise<BlogPost> {
  const response = await fetch(source.url);
  const raw = await response.text();
  const parsed = parseFrontmatter(raw);
  const data = parsed.data;

  return {
    slug: source.slug,
    url: source.url,
    meta: {
      title: data.title ?? emptyMeta.title,
      date: data.date ?? emptyMeta.date,
      excerpt: data.excerpt ?? emptyMeta.excerpt,
      tags: Array.isArray(data.tags) ? data.tags : emptyMeta.tags,
    },
    content: parsed.content,
  };
}

function BlogIndex({
  posts,
  selectedTag,
}: {
  posts: BlogPost[];
  selectedTag: string;
}) {
  const visiblePosts = selectedTag
    ? posts.filter((post) => post.meta.tags.includes(selectedTag))
    : posts;

  return (
    <div className="flex flex-col gap-6">
      {visiblePosts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="rounded-lg border border-amber-200/20 bg-amber-950 p-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-amber-200/60"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white">{post.meta.title}</h2>
            <p className="text-slate-200">{post.meta.excerpt}</p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="mr-1 text-sm text-amber-200">{post.meta.date}</span>
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-amber-200/10 px-3 py-1 text-xs text-amber-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BlogArticle({ post }: { post: BlogPost }) {
  return (
     <article className="rounded-lg border border-amber-200/20 bg-amber-950 p-6 text-left shadow-lg md:p-10">
      <div className="mb-8 flex flex-col gap-2 border-b border-amber-200/20 pb-6">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          {post.meta.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-amber-200">{post.meta.date}</span>
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-200/10 px-3 py-1 text-xs text-amber-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 mt-8 text-3xl font-bold text-white">
              {children}
            </h1>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-7 text-slate-200">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-200">
              {children}
            </ul>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-amber-100">{children}</strong>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
}

function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    let isActive = true;

    Promise.all(blogSources.map(loadBlog)).then((loadedPosts) => {
      if (!isActive) {
        return;
      }

      setPosts(
        loadedPosts.sort((a, b) => b.meta.date.localeCompare(a.meta.date))
      );
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, []);

  const post = posts.find((currentPost) => currentPost.slug === slug);
  const tags = Array.from(
    new Set(posts.flatMap((currentPost) => currentPost.meta.tags))
  ).sort();

  const selectTag = (tag: string) => {
    setSelectedTag(tag);
    if (slug) {
      navigate("/blog");
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-950 px-4 py-8 text-slate-200 md:px-8"
      style={{
        backgroundImage: "url(/banner.png)",
        backgroundSize: "auto 30vh",
        animation: "moveIt 90s linear infinite",
      }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 rounded-lg bg-amber-950 px-4 py-3">
          {slug ? (
            <Link
              to="/blog"
              aria-label="All posts"
              title="All posts"
              className="rounded-full p-2 text-amber-200 transition hover:bg-amber-100/10 hover:text-amber-100"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>
            </Link>
          ) : (
            <Link
              to="/"
              aria-label="Back home"
              title="Back home"
              className="rounded-full p-2 text-amber-200 transition hover:bg-amber-100/10 hover:text-amber-100"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m3 11 9-8 9 8" />
                <path d="M5 10v10h14V10" />
                <path d="M9 20v-6h6v6" />
              </svg>
            </Link>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => selectTag("")}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selectedTag === ""
                  ? "border-amber-100 bg-amber-100 text-amber-950"
                  : "border-amber-200/40 text-amber-100 hover:bg-amber-100 hover:text-amber-950"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  selectedTag === tag
                    ? "border-amber-100 bg-amber-100 text-amber-950"
                    : "border-amber-200/40 text-amber-100 hover:bg-amber-100 hover:text-amber-950"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="rounded-lg bg-amber-950 p-6 text-slate-200">
            Loading posts...
          </p>
        ) : slug ? (
          post ? (
            <BlogArticle post={post} />
          ) : (
            <p className="rounded-lg bg-amber-950 p-6 text-slate-200">
              Post not found.
            </p>
          )
        ) : (
          <BlogIndex
            posts={posts}
            selectedTag={selectedTag}
          />
        )}
      </div>
    </div>
  );
}

export default Blog;
