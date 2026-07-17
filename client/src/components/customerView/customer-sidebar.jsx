/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Star, MessageSquare, CreditCard } from "lucide-react";

const navItems = [
	{ id: "dashboard", label: "Dashboard", path: "/user/dashboard", icon: Home },
	{ id: "profile", label: "Profile", path: "/user/profile", icon: User },
	{ id: "messages", label: "Messages", path: "/user/messages", icon: MessageSquare },
	{ id: "vip", label: "Premium", path: "/user/vip", icon: Star },
	{ id: "payments", label: "Payments", path: "/user/payments", icon: CreditCard },
];

const SidebarItem = ({ item, active }) => {
	const Icon = item.icon;
	return (
		<Link
			to={item.path}
			className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-primary transition-colors ${
				active ? "bg-accent/50 text-primary font-medium" : "text-gray-700"
			}`}
		>
			<Icon className="w-4 h-4" />
			<span>{item.label}</span>
		</Link>
	);
};

const CustomerSidebar = ({ className = "w-64" }) => {
	const location = useLocation();

	return (
		<aside className={`${className} hidden lg:block bg-white border-r p-4`}>
			<div className="mb-6 px-1">
				<h3 className="text-sm font-semibold">Monster Tipsters</h3>
				<p className="text-xs text-gray-500">Find tips, go premium, win more</p>
			</div>

			<nav className="flex flex-col space-y-1">
				{navItems.map((item) => (
					<SidebarItem
						key={item.id}
						item={item}
						active={location.pathname.startsWith(item.path)}
					/>
				))}
			</nav>

			<div className="mt-auto pt-6 border-t pt-4">
				<Link to="/user/settings" className="text-xs text-gray-500 hover:text-primary">
					Settings
				</Link>
			</div>
		</aside>
	);
};

export default CustomerSidebar;

