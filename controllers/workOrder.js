const WorkOrder = require("../models/workOrder");
const Parts = require("../models/part");
const Joi = require("@hapi/joi");

 exports.index = (req, res, next) => {
//   const myCustomLabels = {
//     totalDocs: 'itemCount',
//     docs: 'itemsList',
//     limit: 'perPage',
//     page: 'currentPage',
//     nextPage: 'next',
//     prevPage: 'prev',
//     totalPages: 'pageCount',
//     pagingCounter: 'slNo',
//     meta: 'paginator'
//   };
   
//   const options = {
//     page: 1,
//     limit: 7,
//     customLabels: myCustomLabels
//   };

//   WorkOrder.paginate({}, options, function(err, data) {
//       if (err) return next(err);
//       return res.json(data);
//     });
};

exports.add = (req, res) => {
  const data = req.body;
  const workOrder = new WorkOrder(data);
  const { error } = validation(data);
  if (error)
    return res
      .json({ success: false, message: error.details[0].message })
      .status(400);
  workOrder.save(function(err) {
    if (err) return res.json({ success: false, message: "An error occured!" });
    WorkOrder.find()
      .sort({ _id: -1 })
      .exec((err, data) => {
        return res.json({
          success: true,
          message: "New Work Order has been created!",
          data: data[0]
        });
      });
  });
};

exports.view = function(req, res) {
  WorkOrder.findOne({ _id: req.params.id }, function(err, data) {
    if (err) return res.json({ message: "No Work Order found" });
    return res.status(200).json(data);
  });
};

exports.filteredView = (req, res, next) => {
  WorkOrder.find(req.body).exec((err, doc) => {
    if (err) return next(err);
    return res.json(doc);
  });
};

exports.update = function(req, res) {
  let data = req.body;
  const { error } = validation(data);
  if (error)
    return res
      .json({ success: false, message: error.details[0].message })
      .status(400);
  WorkOrder.findByIdAndUpdate(req.params.id, data, function(err, data) {
    if (err) return res.status(400).json({ message: err.message });
    return res.json({
      success: true,
      message: "Work Order details has been updated!",
      data: data
    });
  });
};

exports.updateParts = function(req, res) {
  let data = req.body;
  let workOrderParts = [];
  const rowLen = data.parts.length;
  function addParts() {
    return new Promise(function(resolve, reject) {
      data.parts.map((part, i) => {
        Parts.findOne({ partName: part.partName }, function(err, _part) {
          let newQuantity = {
            quantity: parseInt(_part.quantity) - parseInt(part.quantity)
          };
          Parts.findByIdAndUpdate(_part._id, newQuantity, function(err, _data) {
            workOrderParts.push({
              partName: part.partName,
              quantity: part.quantity,
              cost: parseInt(_data.unitCost) * parseInt(part.quantity)
            });
            if (rowLen === i + 1) {
              resolve(workOrderParts);
            }
          });
        });
      });
    });
  }
  addParts().then(function(data) {
    WorkOrder.findByIdAndUpdate(req.params.id, { parts: data }, function(
      err,
      kiki
    ) {
      if (err) return res.json({ message: "an error occured" });
      WorkOrder.findOne({ _id: req.params.id }, function(err, _newData) {
        return res.json({
          success: true,
          message: "Work Order details has been updated!",
          data: _newData
        });
      });
    });
  });
};

exports.delete = (req, res) => {
  WorkOrder.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.json({ message: err.message });
    res.json({ message: "Work Order has been deleted" });
  });
};

function validation(_data) {
  const schema = {
    _id: Joi.string(),
    updated: Joi.string(),
    __v: Joi.number().integer(),
    title: Joi.string()
      .min(3)
      .required(),
    description: Joi.string()
      .min(10)
      .required(),
    estimatedDuration: Joi.number()
      .integer()
      .required(),
    priority: Joi.string().required(),
    assignedTo: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    dueDate: Joi.string().required(),
    asset: Joi.string(),
    recurringSchedule: Joi.string(),
    additionalWorkers: Joi.array(),
    parts: Joi.array()
  };
  return Joi.validate(_data, schema);
}
