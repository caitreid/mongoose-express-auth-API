// seed.js will be run by the script `npm run seed`

// this will seed our databse with a buncha pets

// we can modify this later after building out our API a little bit.

const mongoose = require('mongoose')
const Artist = require('./artist')
const db = require('../../config/db')

// name: {
//     type: String,
//     required: true,
// },
// type: {
//     type: String,
//     required: false,
// },
// birthday: {
//     type: Date,
//     required: false
// },
// deathday: {
//     type: Date,
//     required: false
// },

const startArtists = [
    { name: 'Frida Kahlo', type: 'Painter', birthday: '1907-07-06', deathday: '1954-07-13'},
    { name: 'Diego Rivera', type: 'Painter', birthday: '1886-12-08', deathday: '1957-11-24'},
    { name: 'Pablo Picasso', type: 'Painter', birthday: '1881-10-25', deathday: '1973-04-08'},
]



mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Artist.deleteMany()
            .then(deletedArtists => {
                console.log('the deleted artists:', deletedArtists)
                // now we add our artists to the db
                Artist.create(startArtists)
                    .then(newArtists => {
                        console.log('the new artists', newArtists)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })