import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success("Registered", { position: "top-center" });
      navigate("/auth/login");
    } catch (err) {
      toast.error(err || "Registration failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
