import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "@/redux/slices/adminSlice";

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-sm text-muted-foreground">Browse recent registered users and account status.</p>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="grid grid-cols-5 gap-3 bg-muted/40 px-4 py-3 text-sm font-medium text-muted-foreground">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Role</span>
          <span>Verified</span>
        </div>

        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-5 gap-3 border-t px-4 py-3 text-sm">
            <span>{user.name}</span>
            <span className="truncate">{user.email}</span>
            <span>{user.phoneNumber || "-"}</span>
            <span>{user.userType}</span>
            <span>{user.verified ? "Yes" : "No"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
