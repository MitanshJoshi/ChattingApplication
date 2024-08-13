import express from "express"
import { addProfileImage, deleteImage, getUser, login, signup, updateProfile } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer"

const router = express.Router();

const upload = multer({dest:"uploads/profiles/"})

router.post("/signup",signup)
router.post("/login",login)
router.get("/getuser",verifyToken,getUser)
router.post("/updateprofile",updateProfile)
router.post("/addimage",verifyToken,upload.single("profile-image"),addProfileImage)
router.delete("/deleteimage",deleteImage)

export default router