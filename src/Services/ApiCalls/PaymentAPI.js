import { toast } from "react-hot-toast";
import apiConnector from "../ApiConnector";
import { apiEndPoints } from "../apis";
import { resetCart } from "../../redux/Slices/cartSlice";

const {ORDER_API,VERIFYPAYMENT_API} = apiEndPoints;

export const payment = async (cart,user,token,navigate,dispatch)=>{
    
    try {
       
        const orderResponse = await apiConnector('post',ORDER_API, {cart})

        
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
            }
        console.log("PRINTING orderResponse", orderResponse);

         const email = user.email;
        const options = {
            key: "rzp_test_8LAXuuI2163nzN",
            currency: orderResponse.data.paymentResponse.currency,
            amount: orderResponse.data.paymentResponse.amount,
            order_id:orderResponse.data.paymentResponse.id,
            name:"ECOMZY",
            description: "Thank You for Purchasing the Course",
            prefill: {
                name:`${user.name}`,
                email:user.email
            },
            handler : (response) => {
                verifyPayment({...response, cart, email},  token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })


  
        
    } catch (error) {
         console.log(error.message);
    }
      
}

const verifyPayment = async (bodyData,token,navigate,dispatch)=>{
    const toastId = toast.loading("Verifying Payment....");
    try {
        const response  = await apiConnector("POST", VERIFYPAYMENT_API, bodyData)

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful");
        dispatch(resetCart());
        navigate("/");
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");    
    }
    toast.dismiss(toastId);
}