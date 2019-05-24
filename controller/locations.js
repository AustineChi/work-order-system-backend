const mongoose = require("mongoose");
const Location = require("../models/locations");
const Joi = require('@hapi/joi');

exports.index = (req, res) => {
  Location.find().exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
  const data = req.body;
  const location = new Location(data);
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
  if (location.name && location.address) {
    location.save(function(err) {
      if (err) return res.json({ success: false, message: "An error occured!" });
      // saved!
      return res.json({ success: true, message: "New Location Created!" });
    });
  } else {
    return res.json({ success: false, message: "An error occured!" });
  }
};

module.exports.view = function(req, res) {
  Location.findOne({ _id: req.params.id }, function(err, location) {
    if (err)  return res.json({ message: "Location not found" });
    return res.status(200).json(location);
  });
};

module.exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
  Location.findByIdAndUpdate((req.params.id), data, function(err, data) {
    if (err) return res.status(400).json({message: err.message});
    return res.json({
      success: true,
      message: "location details has been updated!",
      data: data
    });
  });
};

module.exports.delete = (req, res) => {
  Location.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({message: err.message});
    res.json({message: "location has been deleted"});
  });
};

function validation(_data) {
  const schema = {
    name: Joi.string().min(3).required(),
    address: Joi.string().min(10).required()
  }
  return Joi.validate(_data, schema);
}