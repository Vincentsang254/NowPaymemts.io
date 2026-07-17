import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import matchingReducer from "./slices/matchingSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        payment: paymentReducer,
        matching: matchingReducer,
    },
});

export default store;