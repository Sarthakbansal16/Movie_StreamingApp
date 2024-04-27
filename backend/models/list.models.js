import mongoose,{Schema} from "mongoose";

const ListSchema = new Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },
    type:{
        type:String
    },
    genre:{
        type:String
    },
    content:{
        type:Array
    }
},{timestamps:true}
);

export const List = mongoose.model("List",ListSchema)

