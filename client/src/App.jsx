import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard/dashboard";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import { loadUser, setUserLoaded } from "./features/slices/authSlice";
import ForgotPassword from "./pages/auth/forgot-password";
import AdminUsers from "./pages/admin-view/management/users/admin-users";

import AdminPayments from "./pages/admin-view/management/payments/payments";

import ResetPassword from "./pages/auth/password-reset";
import ProductUpload from "./pages/product-upload";
import PropertyUpload from "./pages/property-upload";

const App = () => {
  const dispatch = useDispatch();
  const userLoaded = useSelector((state) => state.auth.userLoaded);

  console.log("User Loaded:", userLoaded);

  useEffect(() => {
    const initializeAuth = async () => {

      const token = localStorage.getItem("accessToken");
      if (token) {
        dispatch(loadUser());
      } else {
        dispatch(setUserLoaded());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!userLoaded) {
    return (
      <div className="flex flex-col overflow-hidden bg-white min-h-screen">
        <Skeleton className="w-full h-screen bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white min-h-screen">
      <h1>App</h1>
   <p>Welcome to the GBox App!</p>
    </div>
  );
};

export default App;