const mongoose = require( 'mongoose' );

const visitorSchema = mongoose.Schema({     
    name: String,
    gender: String,
    email: String,
    mobileNumber: String,
    address: String,
    WhomToSee: String,
    companyName: String,
    signedOut:  { type: Boolean, default: false },
    updated: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Visitors', visitorSchema);
