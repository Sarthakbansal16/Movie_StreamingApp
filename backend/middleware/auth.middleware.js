import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = async(req,_, next) => {
    try {
        const authHeader=req.headers.token;
        //console.log(req.headers.token)
        if(authHeader){
            const token= authHeader.split(" ")[1];
            if (!token) {
                throw new ApiError(401, "Unauthorized request")
            }

            const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decodedToken?._id).select("-password")
    
            if (!user) {
                throw new ApiError(401, "Invalid Access Token")
            }
            req.user = user;
            next()
            }
            else{
                throw new ApiError(401,"You are not Authenticated")
            } 
        }catch(error) {
            throw new ApiError(401, error?.message || "Invalid access token")
        }
    }
    