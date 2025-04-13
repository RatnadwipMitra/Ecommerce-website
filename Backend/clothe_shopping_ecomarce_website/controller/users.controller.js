// const mongoose = require("mongoose");
const asyncHandeler = require("express-async-handler");
const userModel = require("../model/users.model")

const bycriptjs=require("bcryptjs")
const jwt = require("jsonwebtoken")
const env  = require("dotenv").config()

const hassedpassword=(passinput)=>{
    const salt = bycriptjs.genSaltSync(10);
    const hash = bycriptjs.hashSync(passinput, salt);
    return hash;
}

const adduser = asyncHandeler(async(req,res)=>{
    const userinfo = await userModel.create({
        "user_id":"user-"+ Math.floor(Math.random()*9999),
        "user_name":req.body.name,
        "user_email":req.body.email,
        "user_password":hassedpassword(req.body.password),
        "user_ph_no":req.body.phno,
    })
    if(!userinfo){
        res.status(403).json({"message":"signup_error"})
    }
    else{
        res.status(200).json({"message":"signup_success"})
    }
})

const loginUser =asyncHandeler(async(req,res)=>{
    const userinfo =await userModel.findOne({"user_email":req.body.email})
    if(userinfo){
        let db_pass_pass=userinfo.user_password;
       var isvalid= bycriptjs.compareSync(req.body.password,db_pass_pass) ? true : false
       if(isvalid){
        let token = jwt.sign({"user_id":userinfo.user_id},process.env.secretKey,{expiresIn:"1h"})
        res.status(200).json({"message":"login_success","user_info":userinfo,"token":token})
       }
       else{
        res.status(403).json({"message":"wrong password"})
       }
    }
    else{
        res.status(403).json({"message":"invaild username"})

    }
})

module.exports={
    adduser,loginUser

}