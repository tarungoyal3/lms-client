// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
// import { authApi } from "@/features/api/authApi";
// export const appStore = configureStore({
//     reducer:{
//         auth:rootReducer,
//         [authApi.reducerPath]: authApi.reducer
//     },
//     middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware)
// })


// const initializeApp = async()=>{
//     await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
// }
// initializeApp(); 


























import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js"
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [purchaseApi.reducerPath]:purchaseApi.reducer,
        [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware)
});

// Ensure Redux initializes with user data
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};
initializeApp();
