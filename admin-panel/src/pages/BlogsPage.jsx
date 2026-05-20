import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await api.get("/blogs");
      setBlogs(response.data.blogs || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Blogs</h2>
          <p className="text-sm text-gray-500">
            Manage all blog posts from here
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Blog
        </Link>
      </div>

      {isLoading && <p className="text-gray-600">Loading blogs...</p>}

      {error && (
        <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && blogs.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-gray-500">
          No blogs found.
        </div>
      )}

      {!isLoading && !error && blogs.length > 0 && (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Categories
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Tags
                </th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b last:border-b-0">
                  <td className="px-4 py-3 text-sm text-gray-800">
                    <div className="font-medium">{blog.title}</div>
                    <div className="text-xs text-gray-500">{blog.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {blog.author?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {Array.isArray(blog.categories)
                      ? blog.categories.join(", ")
                      : blog.categories || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {Array.isArray(blog.tags)
                      ? blog.tags.join(", ")
                      : blog.tags || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BlogsPage;