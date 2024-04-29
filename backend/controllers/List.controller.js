import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {List} from "../models/list.models.js"
// import { addListener } from "nodemon";

//create the list
const createList = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const newList = await List.create(req.body);
        return res
          .status(201)
          .json(new ApiResponse(200, newList, "List is added successfully"));
      } catch (err) {
        throw new ApiError(500, err?.message);
      }
    } else {
      throw new ApiError(403, "You are not Allowed because you are not an Admin");
    }
  };

    //delete the list
    const deleteList = async (req, res) => {
        if (req.user.isAdmin) {
          try {
            await List.findByIdAndDelete(req.params.id)
            return res
              .status(200)
              .json(new ApiResponse(200,{}, "List has been deleted"));
          } catch (error) {
            throw new ApiError(500, error.message);
          }
        }
      };  
    
    //get list

    const getList = async(req,res) => {
        const typeQuery= req.query.type;
        const genreQuery= req.query.genre;
        let list=[];
        try{
            if(typeQuery){
                if(genreQuery){
                    list=await List.aggregate([
                        {$sample: {size:10}},
                        {$match : {type:typeQuery, genre: genreQuery}}
                    ]);
                }
                else{
                    list = await List.aggregate([
                        {$sample: {size:10}},
                        {$match: {type:typeQuery}},
                    ]);
                }
            }
            else{
                list = await List.aggregate([{$sample: {size:10}}]);
            }
            return res
              .status(200)
              .json(new ApiResponse(200,list, "List is fetched successfully"));
        }catch(err){
            throw new ApiError(500,err?.message)
        }
     }
     

  export {createList,deleteList,getList}