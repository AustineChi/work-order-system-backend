const mongoose = require( 'mongoose' );

const teamSchema = mongoose.Schema({     
    name: String,
    teamMembers: Array
});

module.exports =  mongoose.model('Teams', teamSchema);