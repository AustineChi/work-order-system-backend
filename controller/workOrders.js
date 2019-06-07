const WorkOrder = require("../models/workOrders");
const Joi = require('@hapi/joi');

exports.index = (req, res, next) => {
  WorkOrder.find().sort({_id: -1}).exec((err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
};

exports.add = (req, res) => {
  const data = req.body;
  const workOrder = new WorkOrder(data);
  const { error } = validation(data);
  if (error) return res.json({ success: false, message: error.details[0].message }).status(400)
  workOrder.save(function(err) {
      if (err) return res.json({ success: false, message: "An error occured!" });
      WorkOrder.find().sort({_id: -1}).exec((err, data) => {
        return res.json({ success: true, message: "New Work Order has been created!", data: data[0] });     
       });     
    });
};

module.exports.view = function(req, res) {
  WorkOrder.findOne({ _id: req.params.id }, function(err, data) {
    if (err)  return res.json({ message: "No Work Order found" });
    return res.status(200).json(data);
  });
};

exports.filteredView = (req, res, next)=>{
  console.log(req.body);
  WorkOrder.find(req.body).exec((err, doc)=>{
      if (err) return next(err);
      console.log(doc)
      return res.json(doc);
    })
}

module.exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error) return res.json({ success: false, message: error.details[0].message }).status(400)
  WorkOrder.findByIdAndUpdate((req.params.id), data, function(err, data) {
    if (err) return res.status(400).json({message: err.message});
    return res.json({
      success: true,
      message: "Work Order details has been updated!",
      data: data
    });
  });
};

module.exports.delete = (req, res) => {
  WorkOrder.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({message: err.message});
    res.json({message: "Work Order has been deleted"});
  }); 
};

function validation(_data) {
  const schema = {
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    estimatedDuration: Joi.number().integer().required(),
    priority: Joi.string().required(),
    assignedTo: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    dueDate: Joi.string().required(),
    asset: Joi.string(),
    recurringSchedule: Joi.string(),
    additionalWorkers: Joi.array()
  }
  return Joi.validate(_data, schema);
}

