
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axiosInstance from "axios"

// const baseURL = import.meta.env.VITE_API_BASE_URL;
// export const getBannerDetail: any = createAsyncThunk(
//     "banner/getBannerDeatil",
//     async (id: any, thunkAPI) => {
//         try {

//             const response: any = await axiosInstance.get(`${baseURL}/banner/` + id, {
//                 headers: {
//                    "Authorization": "Bearer " + localStorage.getItem("accessToken")

//                 }
                
//             })
//             console.log("Token being sent:", localStorage.getItem("accessToken"));

//             return response.data.result
//         }
//         catch (exception) {
//             throw exception
//         }
//     }

// )


// const BannerSlice = createSlice({
//     name: "banner",
//     initialState: {
//         listAll: null,  //  state properties inside Redux state
//         bannerDetail:null
//     },
//     reducers: {
//         helloWorld: (state, action) => {
//             state.listAll = action.payload
//         }
//     },


//     extraReducers: (builder) => {
//         builder.addCase(getBannerDetail.fulfilled, (state, action)=>{
//          state.bannerDetail=action.payload   
    
//         })
//         builder.addCase(getBannerDetail.rejected,(state,action)=>{
//             state.bannerDetail=null
//         })
//     }
// })

// export const { helloWorld } = BannerSlice.actions;
// export default BannerSlice.reducer;