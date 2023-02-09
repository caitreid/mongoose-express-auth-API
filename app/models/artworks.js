const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
    name: { String },
    year: { Number },
    medium: { String },
    onView: { Boolean }
}, { timestamps: true })

module.exports =  artworkSchema