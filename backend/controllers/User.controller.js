import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"

const updateUser = async(req,res) => {
    if(req.user.id=== req.params.id || req.user.isAdmin){
        if(req.body.password){
            const{oldPassword,newPassword} = req.body
            const user = await User.findById(req.user?._id)
            const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)

            if(!isPasswordCorrect){
                throw new ApiError(400,"Invalid old Password")
            }

            user.password=newPassword
            await user.save({validateBeforeSave:false})
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            )

            return res
            .status(200)
            .json(new ApiResponse(200,updatedUser,"Account details updated successfully"))
          } catch (err) {
            throw new ApiError(500,err?.message)
          }
    }
    
    else {
        throw new ApiError(403,"You can update only your account")
    }

}

const deleteUser = async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        return res
        .status(200)
        .json(new ApiResponse(200,"User has been deleted"))
      } catch (err) {
        throw new ApiError(500,err?.message)
      }
    } else {
        throw new ApiError(403,"You can delete only your account!")
    }
  }

//get current user
  const getUser = async(req, res) => {
    
    try {
        const user=await User.findById(req.params.id).select("-password");
        return res
        .status(200)
        .json( new ApiResponse(200,user,"fetched successfully"))
      } catch (err) {
        throw new ApiError(500,err?.message)
      }
  }

// get all users
const getAllUsers = async(req,res) => {
  const query=req.query.new;
  if(req.user.isAdmin){
    try{
      const users= query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
      return res
        .status(200)
        .json( new ApiResponse(200,users,"All users fetched"))
    }catch(err){
      throw new ApiError(500,err.message)
    }
  }else{
    throw new ApiError(403,"You are not allowed to see all users!");
  }
}

const userStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res
    .status(200)
    .json(new ApiResponse(200,data,"All data is fetched and shown"))
  } catch (err) {
    throw new ApiError(500,err?.message)
  }
}

export{updateUser,deleteUser,getAllUsers,getUser,userStats}