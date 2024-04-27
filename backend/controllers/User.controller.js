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
        throw new ApiResponse(200,"User has been deleted")
      } catch (err) {
        throw new ApiError(500,err?.message)
      }
    } else {
        throw new ApiError(403,"You can delete only your account!")
    }
  }

export{updateUser,deleteUser}