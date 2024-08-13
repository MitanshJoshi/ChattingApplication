import express from "express"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import validator from "validator"


const userSchma = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    password:{
        type:String,
        required:true, 
    },
    firstName:{
        type:String,
        // required:true,
    },
    lastName:{
        type:String,
        // required:true
    },
    image:{
        type:String,
        // required:true
    },
    color:{
        type:String,
        // required:true
    },
    profileSetup:{
        type:Boolean,
        default:false
    }
})

userSchma.pre("save",async function (next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


const User = mongoose.model("Users",userSchma)

export default  User;