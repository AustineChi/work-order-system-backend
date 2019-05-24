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
    additionalWorkers: Array,
    location: String,
    assets: Array,
    updated: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('WorkOrder', workOrderSchema);

