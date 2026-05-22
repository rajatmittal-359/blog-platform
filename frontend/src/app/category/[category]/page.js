import Link from "next/link";
import api from "../../lib/api";
import { notFound } from "next/navigation";

async function getBlogsByCategory(category) {
  try {
    const response = await api.get("/blogs");
    const blogs = response.data.blogs || [];

    return blogs.filter((blog) => {
      if (blog.status !== "published") return false;

      if (Array.isArray(blog.categories)) {
        return blog.categories.some(
          (item) => item.toLowerCase() === decodeURIComponent(category).toLowerCase()
        );
      }

      return (
        blog.categories &&
        blog.categories.toLowerCase() === decodeURIComponent(category).toLowerCase()
      );
    });
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const readableCategory = decodeURIComponent(category);

  return {
    title: `${readableCategory} Blogs`,
    description: `Browse published blogs in the ${readableCategory} category.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const blogs = await getBlogsByCategory(category);
  const readableCategory = decodeURIComponent(category);

  if (!blogs) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-600">
            Category Archive
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {readableCategory}
          </h1>
          <p className="text-gray-600">
            {blogs.length} published blog{blogs.length !== 1 ? "s" : ""} found in this category.
          </p>
        </section>

        {blogs.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm">
            No published blogs found in this category.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
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