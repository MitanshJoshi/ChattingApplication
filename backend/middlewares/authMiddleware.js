import jwt from "jsonwebtoken"

export const verifyToken=async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token)
    {
        return res.status(401).json({
            status:401,
            message:"you are not authenticated"
        })
    }
    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
        if(err){
            return res.status(403).json({
                status:403,
                message:"Token is not valid!"
            })
        }
        req.userId=payload.userId;
        next();
    })
}