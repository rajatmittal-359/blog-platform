import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token && user) {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Admin Login</h2>
        <p className="mb-6 text-sm text-gray-500">
          Login to manage blogs and dashboard access
        </p>

        {isError && (
          <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;