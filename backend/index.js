import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import Userroutes from "./router/userRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const databaseUrl = process.env.MONGO_URL

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json());
app.use("/user",Userroutes)

const server = app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`);
     
})

mongoose.connect(databaseUrl).then(()=>{
    console.log('connection successful');    
});
