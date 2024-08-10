import { compare } from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

const maxAge=3*24*60*60*1000;

const createToken = (email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge})
}
export const signup = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status:400,
                message:"Both email and password is required",
            })
        }
            const user = await User.create({email,password});
            res.cookie("token",createToken(email,user.id),{
                maxAge,
                secure:true,
                sameSite:"None",
            });
            return res.status(201).json({
                status:201,
                message:"user created",
                user
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");   
    }
}
export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status:400,
                message:"Both email and password is required",
            })
        }
        const user = await User.findOne({email});
        if(!user)
        {
           return  res.status(400).json({
                status:400,
                message:"User not found",
            })
        }
            const auth = await compare(password,user.password)
            if(auth)
            {
                res.cookie("token",createToken(email,user.id),{
                    maxAge,
                    secure:true,
                    sameSite:"None",
                });
                return res.status(200).json({
                    status:200,
                    message:"Login Successful",
                    user
                })
            }
           return res.status(400).json({
            status:400,
            message:"Incorrect Password"
           })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");   
    }
}