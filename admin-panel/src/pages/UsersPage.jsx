import { useEffect, useState } from "react";
import api from "../services/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await api.get("/users");
      setUsers(response.data.users || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <p className="text-sm text-gray-500">
  Super admin can view registered users, their roles, and account status.
</p>
      </div>

      {isLoading && <p className="text-gray-600">Loading users...</p>}

      {error && (
        <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && users.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-gray-500">
          No registered users found.
        </div>
      )}

      {!isLoading && !error && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Created At
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b last:border-b-0">
                  <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      user.role === "super-admin"
        ? "bg-purple-100 text-purple-700"
        : user.role === "editor"
        ? "bg-blue-100 text-blue-700"
        : user.role === "author"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {user.role}
  </span>
</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      user.status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {user.status}
  </span>
</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()}
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

export default UsersPage;