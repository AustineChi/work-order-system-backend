const mongoose = require("mongoose");
const Team = require("../models/teams");
const Joi = require('@hapi/joi');

exports.index = (req, res) => {
  Team.find().exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
  const data = req.body;
  const team = new Team(data);
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
    team.save(function(err) {
      if (err) return res.json({ success: false, message: "An error occured!" });
      // saved!
      return res.json({ success: true, message: "New Team Created!" });
    });
 
};

// module.exports.view = function(req, res) {
//   Location.findOne({ _id: req.params.id }, function(err, location) {
//     if (err)  return res.json({ message: "Location not found" });
//     return res.status(200).json(location);
//   });
// };

// module.exports.update = function(req, res) {
//   let data = req.body;
//   const { error } = validation(data);
//   if (error) return res.status(400).send(error.details[0].message);
//   Location.findByIdAndUpdate((req.params.id), data, function(err, data) {
//     if (err) return res.status(400).json({message: err.message});
//     return res.json({
//       success: true,
//       message: "location details has been updated!",
//       data: data
//     });
//   });
// };

// module.exports.delete = (req, res) => {
//   Location.deleteOne({ _id: req.params.id }, function(err) {
//     if (err) return res.json({message: err.message});
//     res.json({message: "location has been deleted"});
//   });
// };

function validation(_data) {
  const schema = {
    name: Joi.string().min(3).required(),
    teamMembers: Joi.array().required()
  }
  return Joi.validate(_data, schema);
}