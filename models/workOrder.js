const mongoose = require( 'mongoose' );
// const mongoosePaginate = require('mongoose-paginate-v2');

const workOrderSchema = mongoose.Schema({     
    title: String,
    description: String,
    dueDate: String,
    recurringSchedule: String,
    estimatedDuration: Number,
    priority: String,
    category: String,
    assignedTo: String,
    additionalWorkers: [],
    location: String,
    asset: String,
    parts: [{}],
    creeatedBy: String,
    updated: { type: Date, default: Date.now }
});

// workOrderSchema.plugin(mongoosePaginate);
module.exports =  mongoose.model('WorkOrder', workOrderSchema);



