const Visitor = require("../models/visitorsLog");
const Joi = require("@hapi/joi");

exports.index = (req, res, next) => {
  Visitor.find()
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return next(err);
      return res.json(data);
    });
};

exports.add = (req, res) => {
  const data = req.body;
  const visitor = new Visitor(data);
  const { error } = validation(data);
  if (error)
    return res
      .json({ success: false, message: error.details[0].message })
      .status(400);
  visitor.save(function(err) {
    if (err) return res.json({ success: false, message: "An error occured!" });
    return res.json({ success: true, message: "Thank you for signing in!" });
  });
};

exports.view = function(req, res) {
  Visitor.findOne({ _id: req.params.id }, function(err, data) {
    if (err) return res.json({ message: "visitor's record not found" });
    return res.status(200).json(data);
  });
};

exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
  Visitor.findByIdAndUpdate(req.params.id, data, function(err, data) {
    if (err) return res.status(400).json({ message: err.message });
    return res.json({
      success: true,
      message: "Thank you for signing out!"
    });
  });
};

function validation(_data) {
  const schema = {
    _id: Joi.string(),
    updated: Joi.string(),
    __v: Joi.number().integer(),
    name: Joi.string()
      .min(6)
      .required(),
    gender: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    mobileNumber: Joi.string().required(),
    address: Joi.string().required(),
    WhomToSee: Joi.string().required(),
    companyName: Joi.string().required(),
    signedOut: Joi.string()
  };
  return Joi.validate(_data, schema);
}
