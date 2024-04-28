import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Movie } from "../models/movie.models.js";

//create movie
const createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const savedMovie = await Movie.create(req.body);
      return res
        .status(201)
        .json(new ApiResponse(200, savedMovie, "Movie is added successfully"));
    } catch (err) {
      throw new ApiError(500, err?.message);
    }
  } else {
    throw new ApiError(403, "You are not Allowed because you are not an Admin");
  }
};

//update movie
const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res
        .status(200)
        .json(new ApiResponse(200, updatedMovie, "Movie has been updated"));
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }
};

//delete movie
const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id)
        return res
          .status(200)
          .json(new ApiResponse(200,{}, "Movie has been deleted"));
      } catch (error) {
        throw new ApiError(500, error.message);
      }
    }
  };

//get movie
 const getMovie = async(req,res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        return res
          .status(200)
          .json(new ApiResponse(200,movie, "Movie is fetched successfully"));
    }catch(err){
        throw new ApiError(500,err?.message)
    }
 }
 
 const getRandomMovie = async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      return res
      .status(200)
      .json(new ApiResponse(200,movie,"Random movie is shown"))
    } catch (err) {
      throw new ApiError(500,err?.message)
    }
  }

//get all movies

const getAllMovies = async(req,res) => {
    if (req.user.isAdmin) {
        try {
          const movies = await Movie.find();
          return res
          .status(200)
          .json(new ApiResponse(200,movies.reverse,"All movies are fetched successfully"))
        } catch (err) {
          throw new ApiError(500,err?.message)
        }
      } else {
        throw new ApiError(403,"You are not Allowed!")
      }
}
export { createMovie, updateMovie,deleteMovie,getMovie,getRandomMovie,getAllMovies};
