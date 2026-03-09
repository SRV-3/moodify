const songModel = require("../models/songs.model")
const id3 = require("node-id3")
const storageServices = require("../services/storage.service")

async function uploadSong(req, res){
    const songBuffer = req.file.buffer
    
    const {mood} = req.body

    const tags =  id3.read(songBuffer)
    const imageBuffer = tags.raw.APIC.imageBuffer


    const[songFile, posterFile] = await Promise.all([
        storageServices.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder:"/cohort-2/moodify/songs"
        }),
        storageServices.uploadFile({
            buffer: imageBuffer,
            filename: tags.title + ".mp3",
            folder:"/cohort-2/moodify/posters"
        })
        
    ])

    const song = await songModel.create({
        url:songFile.url,
        posterUrl:posterFile.url,
        title:tags.title,
        mood
    })

    res.status(201).json({
        message:"song created succesfully",
        song
    })
}

async function getSong(req, res){
    const {mood} = req.query

    const song = await songModel.findOne({mood})

    res.status(200).json({
        message:"song fetched",
        song
    })
}

module.exports = {
    uploadSong,
    getSong
}