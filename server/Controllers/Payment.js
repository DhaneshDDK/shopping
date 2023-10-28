const {instance} = require('../Config/Razorpay');
const CC = require('currency-converter-lt')
const user = require('../Models/User')
const crypto = require('crypto');

exports.initiatePayment = async (req,res)=>{
    const {cart} = req.body;
    let amount = 0;
    cart.forEach((item)=>{
        amount += item.price;
    })

    const options = {
        amount: amount*100*100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success : true,
            paymentResponse,
            message : "Payment initiated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
}




exports.verifyPayment = async (req,res)=>{
    try {
      
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const cart = req.body.cart;
        const email = req.body?.email;

        // console.log(email)
       
    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !cart) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            cart.forEach(async (item)=>{
                await user.findOneAndUpdate({email:email},{
                    $push : {
                        products : item.id
                    }
                });
            })
            const curUser = await user.findOne({email:email});
            //return res
            return res.status(200).json({success:true, curUser, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

      
    } catch (error) {
         res.json({
            success : false,
            message : "Failed to add product" + error.message
         })
    }
}


exports.fetchProducts = async (req,res)=>{
    try {
        const {email} = req.body;
        console.log(email);
        const data = await user.findOne({email: email});
        res.json({
            success : true,
            data,
            message : "Products fetched successfully"
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Error while fetching the products " + error.message
         })
    }
}