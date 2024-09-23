import mongoose from "mongoose";

const playlistSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true

    },
    playlistVide:[]
})

const PLAYLIST=mongoose.model("PLAYLIST",playlistSchema);

export default PLAYLIST