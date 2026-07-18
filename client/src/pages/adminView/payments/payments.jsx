import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPayments } from "@/redux/slices/adminSlice";

const AdminPaymentsPage = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminPayments());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Payments History</h1>
        <p className="text-sm text-muted-foreground">Review recent transaction activity and payment status.</p>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="grid grid-cols-5 gap-3 bg-muted/40 px-4 py-3 text-sm font-medium text-muted-foreground">
          <span>Reference</span>
          <span>User</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Provider</span>
        </div>

        {payments.map((payment) => (
          <div key={payment.id} className="grid grid-cols-5 gap-3 border-t px-4 py-3 text-sm">
            <span>{payment.reference}</span>
            <span>{payment.user?.name || "-"}</span>
            <span>${Number(payment.amount).toFixed(2)}</span>
            <span>{payment.status}</span>
            <span>{payment.provider}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPaymentsPage;
