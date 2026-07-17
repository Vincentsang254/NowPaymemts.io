import React, { useState } from "react";
import axios from "axios";
import { url } from "@/redux/slices/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/auth/reset-password`, { token, password });
      toast.success(res.data.message || "Password reset", { position: "top-center" });
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-3">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded">
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
