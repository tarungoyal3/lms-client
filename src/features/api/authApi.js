// import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import { userLoggedIn } from "../authSlice";

// const USER_API = "http://localhost:8080/api/v1/user/"

// export const authApi = createApi({
//     reducerPath : "authApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: USER_API,
//         credentials:"include"
//     }),

//     endpoints:(builder)=>({
//         registerUser:builder.mutation({
//             query:(inputdata)=>({
//                 url:"register",
//                 method:"POST",
//                 body:inputdata
//             })
//         }),
//         loginUser:builder.mutation({
//             query:(inputdata)=>({
//                 url:"login",
//                 method:"POST",
//                 body:inputdata
//             })
//         }),
//         async onQueryStarted(_,{queryFulfilled,dispatch}){
//             try{
//                 const result = await queryFulfilled;
//                 // dispatch(userLoggedIn({user:result.data.user}))
//                 if (result?.data?.user) {
//                     dispatch(userLoggedIn({ user: result.data.user }));
//                 } else {
//                     console.error("No user data in response:", result);
//                 }
//             }
//             catch(err){
//                 console.error("Error in onQueryStarted:", err);
//             }
//         },
//         logoutUser:builder.mutation({
//             query:()=>({
//                 url:"logout",
//                 method:"GET"
//             })
//         }),
//         loadUser: builder.query({
//             query:()=>({
//                 url:"profile",
//                 method:"GET"
//             })
//         }),
//         async onQueryStarted(_,{queryFulfilled,dispatch}){
//             try{
//                 const result = await queryFulfilled;
//                 // dispatch(userLoggedIn({user:result.data.user}))
//                 if (result?.data?.user) {
//                     dispatch(userLoggedIn({ user: result.data.user }));
//                 } else {
//                     console.error("No user data in response:", result);
//                 }
//             }
//             catch(err){
//                 console.error("Error in onQueryStarted:", err);
//             }
//         },
//         updateUser:builder.mutation({
//             query:(formData)=>({
//                 url:"profile/update",
//                 method:"PUT",
//                 body:formData,
//                 credentials:"include"
//             })
//         })
//     }),

// })

// export const{
//     useRegisterUserMutation,
//     useLoginUserMutation,
//     useLogoutUserMutation,
//     useLoadUserQuery,
//     useUpdateUserMutation
// } = authApi





























































import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputdata) => ({
                url: "register",
                method: "POST",
                body: inputdata
            }),
            async onQueryStarted(inputdata, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    } else {
                        console.error("No user data found in register response", result);
                    }
                } catch (err) {
                    console.error("Error in onQueryStarted (register):", err);
                }
            }
        }),
        loginUser: builder.mutation({
            query: (inputdata) => ({
                url: "login",
                method: "POST",
                body: inputdata
            }),
            async onQueryStarted(inputdata, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    } else {
                        console.error("No user data found in login response", result);
                    }
                } catch (err) {
                    console.error("Error in onQueryStarted (login):", err);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (err) {
                    console.error("Error in onQueryStarted (logout):", err);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    } else {
                        console.error("No user data found in loadUser response", result);
                    }
                } catch (err) {
                    console.error("Error in onQueryStarted (loadUser):", err);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData,
                credentials: "include"
            }),
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    } else {
                        console.error("No user data found in updateUser response", result);
                    }
                } catch (err) {
                    console.error("Error in onQueryStarted (updateUser):", err);
                }
            }
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;
