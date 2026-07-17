import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        payment: paymentReducer,
    },
});

export default store;