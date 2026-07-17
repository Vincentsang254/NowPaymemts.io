import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await dispatch(loginUser({ email, password })).unwrap();
			toast.success("Logged in", { position: "top-center" });
			navigate("/user/dashboard");
		} catch (err) {
			toast.error(err || "Login failed", { position: "top-center" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md bg-white p-6 rounded shadow">
				<h2 className="text-xl font-semibold mb-4">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-3">
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
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-white py-2 rounded"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;

