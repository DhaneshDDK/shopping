import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : null,
    user : localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null,
    loading : false
}

export const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {
          setToken : (state,value) => { state.token = value.payload; },
          setUserData : (state,value) => {state.user = value.payload;},
          setLoading : (state,value) => {state.loading = value.payload;}
    }
})

export const {setToken, setUserData, setLoading} = authSlice.actions;
export default authSlice.reducer;