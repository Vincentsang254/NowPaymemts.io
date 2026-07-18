import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminReports } from "@/redux/slices/adminSlice";

const AdminReportsPage = () => {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminReports());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-muted-foreground">Administrative summaries for subscriptions and payment health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Premium users</p>
          <p className="mt-2 text-2xl font-bold">{reports?.premiumUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">VIP users</p>
          <p className="mt-2 text-2xl font-bold">{reports?.vipUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Pending payments</p>
          <p className="mt-2 text-2xl font-bold">{reports?.pendingPayments ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
