const mongoose = require( 'mongoose' );

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
    updated: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('WorkOrder', workOrderSchema);

