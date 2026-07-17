import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
				<h2 className="text-xl font-semibold mb-4">Welcome back</h2>
				<p className="text-sm text-gray-500 mb-4">Sign in to keep meeting new people.</p>
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
				<div className="mt-4 text-sm text-gray-600 space-y-2">
					<p>
						New here? <Link to="/auth/register" className="text-primary font-medium">Create an account</Link>
					</p>
					<p>
						Forgot your password? <Link to="/auth/forgot-password" className="text-primary font-medium">Reset it</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

