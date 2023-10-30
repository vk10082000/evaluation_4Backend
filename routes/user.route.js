const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../models/blacklist.model");
require('dotenv').config()
const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(200).setDefaultEncoding({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password, 3, async(err, hash)=>{
                if(err){
                  res.status(400).send({"error":err.message})
                }else{
                  const newuser = new UserModel({name,email,gender,age,city,is_married,password:hash})
                  await newuser.save()
                  res.status(200).send({"msg":`User Registeration Successfull`})
                }
              });
        }
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
   
})
userRouter.post("/login",async(req,res)=>{
const {email,password} = req.body;
try {
    const user = await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
           if(result){
            let token = jwt.sign({userID:user._id},process.env.secret,{expiresIn:"7d"})
            res.status(200).send({"msg":"User Login Successfull",token})
           }else{
            res.status(200).send({"Error":"Incorrect Password,please enter valid password"})
           }
        });
    }
    else{
        res.status(200).send({"msg":"User is not existed,please register"})
    }
} catch (error) {
    res.status(400).send({"error":error.message})
}
})
userRouter.post("/logout",async(req,res)=>{
const btoken = req.headers.authorization?.split(" ")[1];
try {
    const token = new BlackListModel({btoken})
    await token.save()
    res.status(200).send({"msg":"user Logouted successfull"})
} catch (error) {
    res.status(400).send({"error":error.message}) 
}
})

module.exports={userRouter}

/**
 * users/register ==> To register a new user.
/users/login ==> For logging in generating a token, token should have an expiry of 7 days.
/logout ==> For Logging out the user by blacklisting the token, add blacklisted token in the Database, schema design can be done in your own way for this.
 */

