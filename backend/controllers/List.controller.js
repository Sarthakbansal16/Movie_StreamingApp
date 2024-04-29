import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {List} from "../models/list.models.js"


const createList = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const newList = await List.create(req.body);
        return res
          .status(201)
          .json(new ApiResponse(200, newList, "Movie is added successfully"));
      } catch (err) {
        throw new ApiError(500, err?.message);
      }
    } else {
      throw new ApiError(403, "You are not Allowed because you are not an Admin");
    }
  };

  export {createList}