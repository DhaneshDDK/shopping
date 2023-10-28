const user = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupController = async (req,res)=>{
    // console.log(req.body);
    // res.send(req.body);
    const {name,email,password,confirmPassword} = req.body;

    try {
        if(!name || !email || !password || !confirmPassword) {
            return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
        }
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }

        const user1 = await user.findOne({email});
        if(user1) {
         return res.status(400).json({
             success: false,
             message: "User already exists. Please sign in to continue.",
         });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDetails = await user.create({
            name : name, email : email, password : hashedPassword
        })

        return res.status(200).json({
			success: true,
			userDetails,
			message: "User registered successfully",
		});

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}


exports.signInController = async (req,res)=>{
    const {email,password} = req.body;
     //verification 
     console.log(email,password);
     if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
        });
    }

    try {
        const user1 = await user.findOne({email});
        if(!user1){
            return res.status(401).json({
				success: false,
				message: `User is not Registered with us Please SignUp to Continue`,
			});
        }

        // console.log(password,user1.password)

        const flag = await bcrypt.compare(password, user1.password );
        console.log(flag);

        if(!flag){
            return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
        }


        const payload = {
            email : user1.email
        }
        
        const token = jwt.sign(  payload,  process.env.JWT_SECRET,
            { expiresIn: "24h", }
        );


        user1.token = token;
        user1.password = undefined;   //since we are printing the user

        res.json({
            success: true,
            token,
            user1,
			message: `User Login Success`,
        })


    } catch (error) {
        return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`+ error.message,
		});
    }
}


