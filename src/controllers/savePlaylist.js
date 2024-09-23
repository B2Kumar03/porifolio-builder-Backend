import { asyncHandler } from "../utils/asynchandler.js";
import PLAYLIST from "../models/playlist.model.js";

// Controller to save or update a playlist
const savePlaylist = asyncHandler(async (req, res) => {
  const { id, playlistVide } = req.body;

  // Validate the request body
  if (!id || !playlistVide) {
    return res.status(400).json({
      success: false,
      message: "Playlist ID and videos are required",
    });
  }

  try {
    // Find if the playlist already exists
    let playlist = await PLAYLIST.findOne({ id });

    if (playlist) {
      // Update existing playlist
      playlist.playlistVide = playlistVide;
      await playlist.save();
      res.status(200).json({
        success: true,
        message: "Playlist updated successfully",
        data: playlist,
      });
    } else {
      // Create a new playlist
      playlist = await PLAYLIST.create({ id, playlistVide });
      res.status(200).json({
        success: true,
        message: "Playlist created successfully",
        data: playlist,
      });
    }
  } catch (error) {
    // Handle errors (like database errors)
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while saving the playlist",
    });
  }
});



// Controller to get a playlist by its ID
const getPlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate that the ID is provided
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Playlist ID is required",
    });
  }

  try {
    // Find the playlist by ID
    const playlist = await PLAYLIST.findOne({ id });

    // If no playlist is found, return a 404 response
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // If playlist is found, return it
    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      data: playlist,
    });
  } catch (error) {
    // Handle any server errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching the playlist",
    });
  }
});

export { savePlaylist,getPlaylist};
