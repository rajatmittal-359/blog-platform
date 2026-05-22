import Link from "next/link";
import api from "../../lib/api";
import { notFound } from "next/navigation";

async function getBlogBySlug(slug) {
  try {
    const response = await api.get(`/blogs/slug/${encodeURIComponent(slug)}`);
    return response.data.blog || null;
  } catch (error) {
    return null;
  }
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== "published") {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.content?.slice(0, 160),
    alternates: {
      canonical: blog.canonicalUrl || `http://localhost:3000/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.ogTitle || blog.metaTitle || blog.title,
      description:
        blog.ogDescription || blog.metaDescription || blog.content?.slice(0, 160),
      url: blog.canonicalUrl || `http://localhost:3000/blog/${blog.slug}`,
      images: blog.ogImage ? [{ url: blog.ogImage }] : [],
      type: "article",
    },
    twitter: {
      card: blog.twitterCard || "summary_large_image",
      title: blog.ogTitle || blog.metaTitle || blog.title,
      description:
        blog.ogDescription || blog.metaDescription || blog.content?.slice(0, 160),
      images: blog.ogImage ? [blog.ogImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== "published") {
    notFound();
  }
  const blogUrl = blog.canonicalUrl || `http://localhost:3000/blog/${blog.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.content?.slice(0, 160),
    image: blog.ogImage || blog.featureImage || "",
    url: blogUrl,
    mainEntityOfPage: blogUrl,
    author: {
      "@type": "Person",
      name: blog.author?.name || "Unknown Author",
    },
    publisher: {
      "@type": "Organization",
      name: "Blog Management System",
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    keywords: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
    articleSection: Array.isArray(blog.categories)
      ? blog.categories.join(", ")
      : blog.categories || "",
  };

  const validFaqItems = Array.isArray(blog.faq)
    ? blog.faq.filter((item) => item.question && item.answer)
    : [];

  const faqSchema =
    validFaqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: validFaqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        {blog.featureImage && (
          <img
            src={blog.featureImage}
            alt={blog.title}
            className="mb-6 h-72 w-full rounded-xl object-cover"
          />
        )}

        <div className="mb-3 flex flex-wrap gap-2">
          {Array.isArray(blog.categories) ? (
            blog.categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${encodeURIComponent(category)}`}
                className="text-sm font-medium uppercase tracking-wide text-blue-600 hover:underline"
              >
                {category}
              </Link>
            ))
          ) : blog.categories ? (
            <Link
              href={`/category/${encodeURIComponent(blog.categories)}`}
              className="text-sm font-medium uppercase tracking-wide text-blue-600 hover:underline"
            >
              {blog.categories}
            </Link>
          ) : (
            <span className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Uncategorized
            </span>
          )}
        </div>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">{blog.title}</h1>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>By {blog.author?.name || "Unknown Author"}</span>
          <span>•</span>
          <span>{blog.status}</span>
        </div>

        <p className="mb-6 text-lg text-gray-600">
          {blog.metaDescription || "No description available."}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
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

        <article className="whitespace-pre-wrap leading-8 text-gray-700">
          {blog.content}
        </article>

        {blog.faq?.length > 0 && (
          <section className="mt-10 border-t pt-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">FAQs</h2>

            <div className="space-y-4">
              {blog.faq.map((item, index) => (
                <div key={index} className="rounded-xl border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-800">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}