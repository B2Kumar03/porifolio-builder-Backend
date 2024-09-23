import { Router } from "express";
import{savePlaylist,getPlaylist }from "../controllers/savePlaylist.js";

// import { Route } from "react-router-dom";

const savePlaylist1=Router()
savePlaylist1.route("/playlist").post(savePlaylist)


savePlaylist1.route("/get-playlist/:id").get(getPlaylist)
export default savePlaylist1;