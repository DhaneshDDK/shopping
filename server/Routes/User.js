const express = require("express");
const router = express.Router();


const {signupController, signInController} = require('../Controllers/authController');
const {initiatePayment, verifyPayment, fetchProducts} = require('../Controllers/Payment');

// ****************************************************************
//                   Authentication Routes
// ****************************************************************

router.post('/signup', signupController);
router.post('/login', signInController);


router.post('/capturePayment', initiatePayment);
router.post('/verifyPayment', verifyPayment);
router.post('/fetchProducts', fetchProducts);



module.exports = router