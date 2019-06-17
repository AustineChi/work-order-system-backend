const User = require("../models/user");
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// exports.index = (req, res, next) => {
//   User.find().sort({_id: -1}).exec((err, data) => {
//     if (err) return next(err);
//     return res.json(data);
//   });
// };

exports.register = (req, res) => {
    const data = req.body;
    const user = new  User(data);
    user.hashPassword = bcrypt.hashSync(data.password, 10);
    const { error } = validation(data);
    if (error) return res.send(error.details[0].message).status(400);
    user.save(function(err, user) {
        if (err) return res.json({ success: false, message: "An error occured!" }).status(400);
        user.hashPassword = undefined;
        return res.json({ success: true, message: "New user Created!" });
      });
  };

  exports.login = (req, res) => {
    const data = req.body;
    User.findOne({
      email: data.email,
    },function(err, user) {
      if (err) throw err;
       if(!user){
        return res.json({ message: "Authentication failed. No user found" }).status(401);
       }
       else if (user){
         if(!user.comparePassword(data.password, user.hashPassword)){
          return res.json({ message: "Authentication failed. Wrong Password" }).status(401);
         }
         else{
           return res.json({token: jwt.sign({email: user.email, lastName: user.lastName, _id: user._id}, 'RESTFULAPIs')});
       } 
      }
    })
  };

 exports.loginRequired = (req, res, next)=>{
   if(req.user){
     next()
   }
   else{
    return res.json({ message: "Unauthorized user!" }).status(401);
   }

 }

function validation(_data) {
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    jobTitle: Joi.string().min(5).required(),
    department: Joi.string().required(),
    realm: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    mobileNumber: Joi.string(),
    gucLine: Joi.string(),
    jobLocation: Joi.string(),
    password: Joi.string(),


  }
  return Joi.validate(_data, schema);
}