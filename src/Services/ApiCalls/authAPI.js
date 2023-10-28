import { apiEndPoints } from "../apis";
import apiConnector from "../ApiConnector";
import {toast} from "react-hot-toast";
import { setToken, setLoading, setUserData } from "../../redux/Slices/authSlice";

const {LOGIN_API, SIGNUP_API, SIGNOUT_API} = apiEndPoints;

export const signup = async (name,email,password,confirmPassword,navigation,dispatch)=>{
    // console.log(email,password,confirmPassword)
    const toastId = toast.loading("Loading...");

    try {
        const res = await apiConnector('post',SIGNUP_API,{name,email,password,confirmPassword});
        // console.log(res);
        toast.success("Signed up successfully")
        navigation('/login');
    } catch (error) {
        console.log(error);
        toast.error("SignUp failed")
    }
    toast.dismiss(toastId)
}


export const login = async (email,password,navigation,dispatch)=>{
    const toastId = toast.loading("Loading...");
    // console.log(email,password);
    try {
        const res = await apiConnector('post',LOGIN_API,{email,password});
        // console.log(res);
        toast.success("LoggedIn successfully")

        dispatch(setToken(res.data.token))
        dispatch(setUserData(res.data.user1))

        localStorage.setItem("token", JSON.stringify(res.data.token))
        localStorage.setItem("user", JSON.stringify(res.data.user1))
        navigation('/');

    } catch (error) {
        console.log(error);
        toast.error("Login failed")
    }
    toast.dismiss(toastId)
}

export const signout = async (navigate,dispatch)=>{
    dispatch(setToken(null))
    dispatch(setUserData(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
}