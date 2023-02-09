// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Artist = require('../models/artist')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()


// CREATE
// POST 
router.post('/artworks/:artistId', removeBlanks, (req, res, next) => {
	// the requireToken middleware, gives us access to req.user
	// set owner of new example to be current user

    console.log(req.body)

	const artwork = req.body.artwork

    const artistId = req.params.artistId

	Artist.findById(artistId)
		// respond to succesful `create` with status 201 and JSON of new "artist"
		.then(handle404)
        .then(artist => {
            console.log('the artist: ', artist)
            console.log('the artwork: ', artwork)

            artist.artworks.push(artwork)

            return artist.save()
        })
        .then(artist => res.status(201).json({ artist: artist}))
        .catch(next)
})

// UPDATE
// PATCH /toy/:toyId
// removeBlanks is middleware that doesn't allow you to overwrite any data with an empty string(or empty value)
router.patch('/artworks/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.artist.owner

	Artist.findById(req.params.id)
		.then(handle404)
		.then((artist) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, artist)

			// pass the result of Mongoose's `.update` to the next `.then`
			return artist.updateOne(req.body.artist)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// | DELETE | `/artworks/:petId/:artworkId`        | `artworks#delete`   |
router.delete('/artworks/:id', requireToken, (req, res, next) => {
	Artist.findById(artistId)
		.then(handle404)
		.then((artist) => {
			// throw an error if current user doesn't own `pet`
			requireOwnership(req, artist)
			// delete the pet ONLY IF the above didn't throw
			artist.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router