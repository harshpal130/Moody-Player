const express = require("express");
const { route } = require("../app");
const multer = require('multer');
const uploadFile = require("../service/storage.service");
// multer is used for reading data in from- data format(which we send through ppostman )
// multer hmari audio file ko temoporary memory store me store karega(memorysorage(ram))

const songModel = require('../models/song.model')
const upload = multer({storage:multer.memoryStorage()});

const router = express.Router();


router.post('/', upload.single("audio"),  async(req, res)=>{     // ye api song ko upload karegi database me 
    try{
        console.log(req.body);
        console.log(req.file);
        const fileData = await uploadFile(req.file);

        const song = await songModel.create({
            title:req.body.title,
            artist:req.body.artist,
            audio:fileData.url,
            mood:req.body.mood
        
    })

        res.status(201).json({
            message : 'song created successfully' ,
            song : song
    });
    }catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
       

});

router.get('/', async (req, res) => {
  try {
    const { mood } = req.query;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const songs = await songModel.find({ mood });

    res.status(200).json({
      message: "songs fetch successfully",
      songs
    });

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
});

module.exports = router