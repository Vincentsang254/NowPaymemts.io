import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import matchingReducer from "./slices/matchingSlice";
import messagingReducer from "./slices/messagingSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        payment: paymentReducer,
        matching: matchingReducer,
        messaging: messagingReducer,
    },
});

export default store;