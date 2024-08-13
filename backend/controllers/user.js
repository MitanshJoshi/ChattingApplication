import { compare } from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import {renameSync,stat,unlinkSync} from "fs"

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


export const getUser=async(req,res,next)=>{
    try {
        const userData =  await User.findById(req.userId);
        if(!userData)
            {
               return  res.status(400).json({
                    status:400,
                    message:"User not found",
                })
            }

            return res.status(200).json({
                status:200,
                userData
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");   
    }
}

export const updateProfile= async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token)
    {
       return res.status(401).json({
            status:401,
            message:"UnAuthorized"
        })
    }
    
     let userId;

     try {
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        userId = decoded.userId;
        
     } catch (error) {
        console.log(error);
        
     }
     
     const {firstName,lastName,color} = req.body;

     if(!firstName || !lastName){
        return res.status(400).json({  
            status:400,
            message:"All fields are required",

        })
     }

     const userData = await User.findByIdAndUpdate(
        userId,
        {
            firstName,
            lastName,
            color,
            profileSetup:true,
        },
        { new: true, runValidators: true }
     );
     return res.status(200).json({
        status:200,
        userData
     })
}

export const addProfileImage= async(req,res,next)=>{
    console.log(req.file);
    
    try {
        if(!req.file)
        {
            return res.status(400).json({
                status:400,
                message:"File is required"
            })
        }
        const date = Date.now();
        let filename = "uploads/profiles/" + date +req.file.originalname;
        console.log(filename);
        
        renameSync(req.file.path,filename);
        let userId;
        try {
            const {token} = req.cookies;
            if(!token)
            {
                return res.status(401).json({
                    status:401,
                    message:"User not Authenticated",
                })
            }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
            userId=decoded.userId;
        } catch (error) {
            console.log(error);
            
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {image:filename},
            {new: true,runValidators:true}
        )

        return res.status(200).json({
            status:200,
            updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
        
    }
}

export const deleteImage=async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            status:401,
            message:"user not authenticated"
        })
    }
    let userId;
    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        userId=decoded.userId;
        const user = await User.findById(userId);
        if(!user)
        {
            return res.json(404).json({
                status:404,
                message:"User not found"
            })
        }
        if(user.image)
        {
            unlinkSync(user.image)
            user.image=null;
            await user.save();
        }
        return res.status(200).json({
            status:200,
            message:"Image deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
        
    }
}