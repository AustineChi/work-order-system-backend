const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({     
    firstName: String,
    lastName: String,
    jobTitle: String,
    email: String,
    mobileNumber: String,
    gucLine: String,
    department: String,
    realm: String,
    jobLocation: String,
    hashPassword: String,
    emailVerified: { type: Boolean, default: false}
});

userSchema.methods.comparePassword = function(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}

module.exports =  mongoose.model('Users', userSchema);