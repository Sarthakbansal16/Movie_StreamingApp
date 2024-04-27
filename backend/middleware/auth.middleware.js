import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";

export const verifyJWT = asyncHandler(async(req,_, next) => {
    try {
        console.log(req)
        //const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // const token = req.header("Authorization")?.replace("Bearer", "")
        // console.log(req.header);
        const token= req.headers['authorization'].split(' ')[1]
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        //jwt.decode()
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})