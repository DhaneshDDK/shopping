
const BASE_URL = process.env.REACT_APP_BASE_URL;


export const apiEndPoints = {
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup",
    SIGNOUT_API : BASE_URL + "/auth/signout",
    ORDER_API : BASE_URL + "/auth/capturePayment",
    VERIFYPAYMENT_API : BASE_URL + "/auth/verifyPayment",
    FETCHPRODUCTS_API : BASE_URL + "/auth/fetchProducts",
}