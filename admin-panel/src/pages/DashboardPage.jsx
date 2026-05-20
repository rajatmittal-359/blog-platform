import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);

      const [blogsRes, usersRes] = await Promise.all([
        api.get("/blogs"),
        user?.role === "super-admin"
          ? api.get("/users")
          : Promise.resolve({ data: { users: [] } }),
      ]);

      const blogs = blogsRes.data.blogs || [];
      const users = usersRes.data.users || [];

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((blog) => blog.status === "published")
          .length,
        draftBlogs: blogs.filter((blog) => blog.status === "draft").length,
        totalUsers: users.length,
      });
    } catch (error) {
      console.error("Failed to load dashboard stats", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="mt-2 text-gray-600">
          Welcome, {user?.name}. Your role is{" "}
          <span className="font-semibold">{user?.role}</span>.
        </p>
      </div>

      {isLoading ? (
        <p className="text-gray-600">Loading dashboard stats...</p>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Total Blogs</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">
                {stats.totalBlogs}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Published Blogs</p>
              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {stats.publishedBlogs}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Draft Blogs</p>
              <h3 className="mt-2 text-3xl font-bold text-yellow-600">
                {stats.draftBlogs}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="mt-2 text-3xl font-bold text-blue-600">
                {stats.totalUsers}
              </h3>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Quick Summary
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              This admin panel currently manages blog content, SEO fields, FAQs,
              and user access control with role-based permissions.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;