import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"


const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        // const refreshToken = user.generateRefreshToken()

        // user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}
const registerUser = async(req,res) => {
    const {email,username,password} = req.body;

    if([email,username,password].some((field) => field?.trim() === "")){
        throw new ApiError(400,"All Fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
} 

const loginUser = async(req,res) => {
    const {username,email,password} = req.body;

    if(!username && !email){
        throw new ApiError(400,"Username or email is required")
    }
    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
        throw new ApiError(401,"Invalid User Credentials")
    }

    const {accessToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly:true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,accessToken
            },
            "User logged In Successfully"
        )
    )
}

export {
    registerUser,
    loginUser
}