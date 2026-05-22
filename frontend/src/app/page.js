import Link from "next/link";
import api from "./lib/api";

export const metadata = {
  title: "Blog Management System",
  description:
    "Browse the latest published blogs. SEO-optimized posts with structured data.",
};

async function getBlogs() {
  try {
    const response = await api.get("/blogs");
    return response.data.blogs || [];
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const blogs = await getBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-600">
            Blog Management System
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Latest Published Blogs
          </h1>
          <p className="max-w-2xl text-gray-600">
            Explore SEO-optimized blog posts built with Next.js frontend,
            React admin panel, Express APIs, and MongoDB backend.
          </p>
        </section>

        {publishedBlogs.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm">
            No published blogs found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
                  <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {blog.status}
                  </p>

                  <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>

                  <p className="mb-3 text-sm text-gray-500">
                    By {blog.author?.name || "Unknown Author"}
                  </p>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {blog.metaDescription || blog.content}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {Array.isArray(blog.tags)
                      ? blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))
                      : blog.tags && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {blog.tags}
                          </span>
                        )}
                  </div>

                  <div className="text-sm font-medium text-blue-600 group-hover:underline">
                    Read More →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}