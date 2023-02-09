const mongoose = require('mongoose')

const artworkSchema = require('../models/artworks')

const artistSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
		birthday: {
			type: Date,
			required: false
		},
		deathday: {
			type: Date,
			required: false
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
		artworks: [artworkSchema]
	},
	{
		timestamps: true,
		// since we're adding virtuals to our artist model
		// we need to tell express to include them when we want them
		toObject: { virtuals: true},
		toJSON: { virtuals: true }
	}
)

artistSchema.virtual('fullTitle').get(function () {
	return `${this.name} the ${this.type}`
})

// virtual properties go here
// use existing data to add a property whenever we retreive these documents

module.exports = mongoose.model('Artist', artistSchema)
