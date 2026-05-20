import { useSelector } from "react-redux";

function DashboardPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      <p className="mt-2 text-gray-600">
        Welcome, {user?.name}. Your role is <span className="font-semibold">{user?.role}</span>.
      </p>
    </div>
  );
}

export default DashboardPage;