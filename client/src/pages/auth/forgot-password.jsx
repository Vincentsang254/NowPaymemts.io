import React, { useState } from "react";
import axios from "axios";
import { url } from "@/redux/slices/api";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/auth/forgot-password`, { email });
      toast.success(res.data.message || "If registered, you'll receive an email", { position: "top-center" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
