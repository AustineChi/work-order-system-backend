const mongoose = require('mongoose');
const Parts = require("../models/parts");
const Joi = require('@hapi/joi');


exports.index = (req, res) => {
    Parts.find().exec((err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};

exports.add = (req, res) => {
    const data = req.body;
   data.created = new Date();
    const part = new Parts(data);
    const { error } = validation(data);
    if (error) return res.status(400).send(error.details[0].message);
      part.save(function(err) {
        if (err) return res.json({ success: false, message: "An error occured!" });
        // saved!
        return res.json({ success: true, message: "Your inventory has been added!" });
      });
  };
  
  module.exports.view = function(req, res) {
    Parts.findOne({ _id: req.params.id }, function(err, part) {
      if (err)  return res.json({ message: "Inventory not found" });
      return res.status(200).json(part);
    });
  };
  
  module.exports.update = function(req, res) {
    let data = req.body;
    const { error } = validation(data);
    if (error) return res.status(400).send(error.details[0].message);
    Parts.findByIdAndUpdate((req.params.id), data, function(err, data) {
      if (err) return res.status(400).json({message: err.message});
      return res.json({
        success: true,
        message: "inventory details has been updated!",
        data: data
      });
    });
  };
  
  module.exports.delete = (req, res) => {
    Parts.deleteOne({ _id: req.params.id }, function(err) {
      if (err) return res.json({message: err.message});
      res.json({message: "asset has been deleted"});
    });
  };
  
  function validation(_data) {
    const schema = {
      partName: Joi.string().min(3).required(),
      partDescription: Joi.string().min(10).required(),
      unitCost: Joi.number().integer().required(),
      quantity: Joi.number().integer().required(),
      minimumPartQuantity: Joi.number().integer().required(),
      partArea: Joi.string().required()

    }
    return Joi.validate(_data, schema);
  }