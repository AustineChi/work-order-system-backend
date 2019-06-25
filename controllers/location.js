const Location = require("../models/location");
const Joi = require("@hapi/joi");

exports.index = (req, res, next) => {
  Location.find()
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return  console.log(err);
      console.log("white people")
      return res.json(data);
    });
    // return res.send([])
};

exports.add = (req, res) => {
  const data = req.body;
  const location = new Location(data);
  const { error } = validation(data);
  if (error)
    return res
      .json({ success: false, message: error.details[0].message })
      .status(400);
  if (location.name && location.address) {
    location.save(function(err) {
      if (err)
        return res.json({ success: false, message: "An error occured!" });
      Location.find()
        .sort({ _id: -1 })
        .limit(1)
        .exec((err, data) => {
          return res.json({
            success: true,
            message: "New Location Created!",
            data: data[0]
          });
        });
    });
  } else {
    return res.json({ success: false, message: "An error occured!" });
  }
};

exports.view = function(req, res) {
  Location.findOne({ _id: req.params.id }, function(err, data) {
    if (err) return res.json({ message: "Location not found" });
    return res.status(200).json(data);
  });
};

exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
  Location.findByIdAndUpdate(req.params.id, data, function(err, data) {
    if (err) return res.status(400).json({ message: err.message });
    return res.json({
      success: true,
      message: "location details has been updated!",
      data: data
    });
  });
};

exports.delete = (req, res) => {
  Location.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({ message: err.message });
    res.json({ message: "location has been deleted" });
  });
};

function validation(_data) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    address: Joi.string()
      .min(10)
      .required()
  };
  return Joi.validate(_data, schema);
}
