import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOverview, fetchAdminReports } from "@/redux/slices/adminSlice";
import AdminAnalyticsChart from "@/components/adminView/admin-analytics-chart";

const AdminAnalyticsPage = () => {
  const dispatch = useDispatch();
  const { overview, reports } = useSelector((state) => state.admin);
  const [view, setView] = useState("overview");

  useEffect(() => {
    dispatch(fetchAdminOverview());
    dispatch(fetchAdminReports());
  }, [dispatch]);

  const chartData = useMemo(() => {
    const base = [
      { label: "Users", value: overview?.totalUsers ?? 0 },
      { label: "Customers", value: overview?.totalCustomers ?? 0 },
      { label: "Premium", value: reports?.premiumUsers ?? 0 },
      { label: "VIP", value: reports?.vipUsers ?? 0 },
    ];

    return view === "full" ? base.map((item) => ({ ...item, value: item.value + 4 })) : base;
  }, [overview, reports, view]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Operational insights for subscriptions, users, and engagement.</p>
        </div>

        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="overview">Overview</option>
          <option value="full">Expanded</option>
        </select>
      </div>

      <AdminAnalyticsChart data={chartData} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Users</p>
          <p className="mt-2 text-2xl font-bold">{overview?.totalUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Premium users</p>
          <p className="mt-2 text-2xl font-bold">{reports?.premiumUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">VIP users</p>
          <p className="mt-2 text-2xl font-bold">{reports?.vipUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="mt-2 text-2xl font-bold">${Number(overview?.totalRevenue || 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
