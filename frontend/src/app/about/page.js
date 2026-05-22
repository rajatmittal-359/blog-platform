import api from "../lib/api";

export const metadata = {
  title: "About",
  description: "Learn more about our blog platform and how we manage SEO-friendly content.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">About</h1>
        <p className="mb-4 text-gray-700">
          This Blog Management System is built to keep content organized and SEO-ready.
          Blogs are created and managed in the admin panel and published to the public
          website for readers to explore.
        </p>
        <p className="mb-4 text-gray-700">
          The public frontend uses Next.js server-side rendering for fast loading and
          SEO metadata, while the backend provides JWT authentication and role-based
          access control for secure blog management.
        </p>
        <p className="text-gray-700">
          Use the admin panel to create posts, configure SEO fields, and publish updates.
        </p>
      </div>
    </main>
  );
}

