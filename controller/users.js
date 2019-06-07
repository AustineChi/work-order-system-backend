const User = require("../models/users");
const Joi = require('@hapi/joi');

exports.index = (req, res, next) => {
  User.find().sort({_id: -1}).exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
    const data = req.body;
    const user = new  User(data);
    const { error } = validation(data);
    if (error) return res.status(400).send(error.details[0].message);
    user.save(function(err) {
        if (err) return res.json({ success: false, message: "An error occured!" });
        return res.json({ success: true, message: "New user Created!" });
      });
  };



function validation(_data) {
  const schema = {
    name: Joi.string().min(5).required(),
    jobTitle: Joi.string().min(5).required(),
    role: Joi.string().min(5).required()
  }
  return Joi.validate(_data, schema);
}