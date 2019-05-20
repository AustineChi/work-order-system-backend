const mongoose = require('mongoose');
const Assets = require("../models/Assets");


exports.index = (req, res) => {
  Assets.find().exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
  const data = req.body;
  const Assets = new Assets(data);
  if (Assets.name && Assets.address) {
    Assets.save(function(err) {
      if (err) return res.json({ success: false, message: "An error occured!" });
      // saved!
      return res.json({ success: true, message: "New Assets Created!" });
    });
  } else {
    return res.json({ success: false, message: "An error occured!" });
  }
};

module.exports.view = function(req, res) {
  Assets.findOne({ _id: req.params.id }, function(err, Assets) {
    if (err)  return res.json({ message: "Assets ID is wrong" });
    return res.status(200).json(Assets);
  });
};

module.exports.update = function(req, res) {
  let data = req.body;
  Assets.findByIdAndUpdate(req.params.id, data, function(err, data) {
    if (err) return res.json({message: "An error occured!"});
    return res.json({
      success: true,
      message: "Assets details has been updated!",
      data: data
    });
  });
};

module.exports.delete = (req, res) => {
  Assets.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({message: err.message});
    res.json({message: "Assets has been deleted"});
  });
};