const Assets = require("../models/assets");
const Joi = require('@hapi/joi');

exports.index = (req, res) => {
  Assets.find().exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
  const data = req.body;
  const asset = new Assets(data);
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
    asset.save(function(err) {
      if (err) return res.json({ success: false, message: "An error occured!" });
      // saved!
      return res.json({ success: true, message: "New Asset has been added!" });
    });
};

module.exports.view = function(req, res) {
  Assets.findOne({ _id: req.params.id }, function(err, data) {
    if (err)  return res.json({ message: "No Asset found" });
    return res.status(200).json(data);
  });
};

module.exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
  Assets.findByIdAndUpdate((req.params.id), data, function(err, data) {
    if (err) return res.status(400).json({message: err.message});
    return res.json({
      success: true,
      message: "Asset details has been updated!",
      data: data
    });
  });
};


module.exports.delete = (req, res) => {
  Assets.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({message: err.message});
    res.json({message: "Asset has been deleted"});
  }); 
};

function validation(_data) {
  const schema = {
    assetName: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    assetCategory: Joi.string().required(),
    location: Joi.string().required(),
    primaryUser: Joi.string().required(),
    area: Joi.string(),
    assignedCustomers: Joi.array(),
    assignedTeams: Joi.array(),
    assignedUsers: Joi.array(),
    assignedVendors: Joi.array(),
    model: Joi.string(),
    active: Joi.string(),
    parentAsset: Joi.string(),
    serialNumber: Joi.number().integer()
  }
  return Joi.validate(_data, schema);
}

