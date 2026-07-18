import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOverview, fetchAdminReports } from "@/redux/slices/adminSlice";
import { Users, Wallet, Crown, Activity, Filter, CalendarRange } from "lucide-react";
import AdminAnalyticsChart from "@/components/adminView/admin-analytics-chart";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { overview, reports } = useSelector((state) => state.admin);
  const [range, setRange] = useState("7d");

  useEffect(() => {
    dispatch(fetchAdminOverview());
    dispatch(fetchAdminReports());
  }, [dispatch]);

  const chartData = useMemo(() => {
    const base = [
      { label: "Users", value: overview?.totalUsers ?? 0 },
      { label: "Customers", value: overview?.totalCustomers ?? 0 },
      { label: "Matches", value: overview?.totalMatches ?? 0 },
      { label: "Messages", value: overview?.totalMessages ?? 0 },
    ];

    return range === "30d" ? base.map((item) => ({ ...item, value: item.value * 2 })) : base;
  }, [overview, range]);

  const statCards = [
    {
      label: "Total Users",
      value: overview?.totalUsers ?? 0,
      icon: Users,
    },
    {
      label: "Premium Users",
      value: reports?.premiumUsers ?? 0,
      icon: Crown,
    },
    {
      label: "Active Subscriptions",
      value: overview?.activeSubscriptions ?? 0,
      icon: Activity,
    },
    {
      label: "Revenue",
      value: `$${Number(overview?.totalRevenue || 0).toFixed(2)}`,
      icon: Wallet,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor engagement, premium growth, and payments from one place.</p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-md border bg-background px-2 py-1 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <CalendarRange className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold">{card.value}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdminAnalyticsChart data={chartData} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Platform Health</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Customers</span>
              <span className="font-semibold text-foreground">{overview?.totalCustomers ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Admins</span>
              <span className="font-semibold text-foreground">{overview?.totalAdmins ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Matches</span>
              <span className="font-semibold text-foreground">{overview?.totalMatches ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Messages</span>
              <span className="font-semibold text-foreground">{overview?.totalMessages ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Operational Snapshot</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>VIP users</span>
              <span className="font-semibold text-foreground">{reports?.vipUsers ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending payments</span>
              <span className="font-semibold text-foreground">{reports?.pendingPayments ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Premium users</span>
              <span className="font-semibold text-foreground">{reports?.premiumUsers ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Revenue</span>
              <span className="font-semibold text-foreground">${Number(overview?.totalRevenue || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

