import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

function DashboardLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">
            Logged in as {user?.name} ({user?.role})
          </p>
        </div>

        <button
          onClick={() => dispatch(logoutUser())}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <div className="flex">
        <aside className="min-h-[calc(100vh-73px)] w-64 border-r bg-white p-4">
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/blogs"
              className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Blogs
            </Link>

            {user?.role === "super-admin" && (
              <Link
                to="/dashboard/users"
                className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                Users
              </Link>
            )}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;