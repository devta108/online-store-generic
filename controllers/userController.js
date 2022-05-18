const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

exports.signup = BigPromise(async (req, res, next) => {
    // console.log("SIGNUP: ", req.body);

    if(!req.files){
        return next(new CustomError("photo is needed for signup",400))
    }
    // console.log("inside signup")

    const { name, email, password } = req.body;
    // console.log(name);
    if (!email ) {
        return next(new CustomError("Please provide email name and password", 400));
    }

    let file = req.files.photo
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath,{
        folder: 'users',
        width: 150,
        crop: 'scale'
    })

    const newUser = await User.create({
        name,
        email,
        password,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url
        }
    })
    cookieToken(newUser,res);
});

exports.login = BigPromise(async (req,res,next) => {
    const {email, password} = req.body

    // check for availabilty of email and Password
    if(!email || !password){
        return next(new CustomError("Please provide email and Password", 400))
    }

    // Let's find user in the database
    const user = await User.findOne({email}).select("+password")
    
    if(!user){
        return next(new CustomError("Not registered to our website", 400))
    }
    const isPassowrdCorrect = await user.isPasswordValidated(password)
    if(!isPassowrdCorrect){
        return next(new CustomError("Username or Password seems to be incorrect or doesn't exist", 400))
    }

    cookieToken(user, res) 
})

exports.logout = BigPromise(async (req,res,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "logout is sucessful"
    })
})