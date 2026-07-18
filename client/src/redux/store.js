import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import matchingReducer from "./slices/matchingSlice";
import messagingReducer from "./slices/messagingSlice";
import adminReducer from "./slices/adminSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        payment: paymentReducer,
        matching: matchingReducer,
        messaging: messagingReducer,
        admin: adminReducer,
    },
});

export default store;