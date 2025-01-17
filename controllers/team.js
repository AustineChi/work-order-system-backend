const Team = require("../models/team");
const Joi = require("@hapi/joi");

exports.index = (req, res, next) => {
  Team.find()
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return next(err);
      return res.json(data);
    });
};

exports.add = (req, res) => {
  const data = req.body;
  const team = new Team(data);
  const { error } = validation(data);
  if (error)
    return res
      .json({ success: false, message: error.details[0].message })
      .status(400);
  team.save(function(err) {
    if (err) return res.json({ success: false, message: "An error occured!" });
    Team.find()
      .sort({ _id: -1 })
      .limit(1)
      .exec((err, data) => {
        return res.json({
          success: true,
          message: "New Team Created!",
          data: data[0]
        });
      });
  });
};

exports.view = function(req, res) {
  Team.findOne({ _id: req.params.id }, function(err, data) {
    if (err) return res.json({ message: "Team not found" });
    return res.status(200).json(data);
  });
};

exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error) return res.status(400).send(error.details[0].message);
  Team.findByIdAndUpdate(req.params.id, data, function(err, data) {
    if (err) return res.status(400).json({ message: err.message });
    return res.json({
      success: true,
      message: "Team details has been updated!",
      data: data
    });
  });
};

exports.delete = (req, res) => {
  Team.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({ message: err.message });
    res.json({ message: "Team has been deleted" });
  });
};

function validation(_data) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    teamMembers: Joi.array().required()
  };
  return Joi.validate(_data, schema);
}
