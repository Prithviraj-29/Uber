const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model') 


//Register controller
module.exports.registerUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    console.log(req.body)

    const {fullname, email, password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message:'user already exist'})
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password:hashPassword
    })

    const token= user.generateAuthToken();
    res.status(201).json({token,user});
}

//login controller
module.exports.loginUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body

    //checks email is existing or not
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'})   
    }

    //checks for password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }

    const token = user.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token,user});

}

//profile
module.exports.getUserProfile = async (req,res,next) =>{
    res.status(200).json(req.user);
}

//logout
module.exports.logoutUser = async(req,res,next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});

    res.status(200).json({message : 'Logged out'})
}