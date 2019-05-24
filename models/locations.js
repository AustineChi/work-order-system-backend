const mongoose = require( 'mongoose' );

const locationSchema = mongoose.Schema({     
    name: String,
    address: String
});

module.exports =  mongoose.model('Locations', locationSchema);

