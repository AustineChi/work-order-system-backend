const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema({     
    name: String,
    jobTitle: String,
    role: String
});

module.exports =  mongoose.model('User', userSchema);