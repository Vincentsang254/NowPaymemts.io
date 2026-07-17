import React, { useState } from "react";
import axios from "axios";
import { url } from "@/redux/slices/api";
import { toast } from "react-toastify";

const VerifyAccountPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/auth/verify-email`, { email, code });
      toast.success(res.data.message || "Verified", { position: "top-center" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Verify Account</h2>
        <form onSubmit={handleVerify} className="space-y-3">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded">
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
