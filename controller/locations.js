const mongoose = require("mongoose");
const Location = require("../models/locations");

exports.index = (req, res) => {
  Location.find().exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
  const data = req.body;
  const location = new Location(data);
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
    if (err)  return res.json({ message: "Location ID is wrong" });
    return res.status(200).json(location);
  });
};

module.exports.update = function(req, res) {
  let data = req.body;
  Location.findByIdAndUpdate(req.params.id, data, function(err, data) {
    if (err) return res.json({message: "An error occured!"});
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