const mongoose = require('mongoose')

// artist has an owner, a name, a type, an age, adoptable()
// Eventually each artist has a toys array
// this model will use virtuals to produce additional data on each artist
// 

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
