import mongoose,{Schema} from "mongoose";

const MovieSchema = new Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },
    desc:{
        type:String,
        required: true,
        unique: true
    },
    img: {
        type:String
    },
    imgTitle: {
        type: String
    },
    imgSm: {
        type: String,
    },
    trailer:{
        type:String
    },
    video:{
        type:String
    },
    year:{
        type:String
    },
    limit:{
        type:Number
    },
    genre:{
        type:String
    },
    isSeries:{
        type:Boolean,
        default:false
    }
},{timestamps:true}
);

export const Movie = mongoose.model("Movie",MovieSchema)

