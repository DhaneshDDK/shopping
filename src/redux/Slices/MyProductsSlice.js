import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : [],
    loading : true,
}

export const myProductsSlice = createSlice({
    name : "myproducts",
    initialState,
    reducers : {     
   
        setPosts : (state,action)=>{
        state.posts = action.payload;
        },

        setLoading : (state,action)=>{
            state.loading = action.payload;
        }

    }
})

export const {setPosts,setLoading} = myProductsSlice.actions;

export default myProductsSlice.reducer;
