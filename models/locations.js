const mongoose = require( 'mongoose' );
const Joi = require('@hapi/joi');

const locationSchema = mongoose.Schema({     
    name: String,
    address: String,
    created: { 
        type: Date, 
    },
});

module.exports =  mongoose.model('Locations', locationSchema);

