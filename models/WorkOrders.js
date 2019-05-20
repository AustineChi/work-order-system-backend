const mongoose = require( 'mongoose' );

const workOrderSchema = mongoose.Schema({     
    title: String,
    description: String,
    dueDate: String,
    recurringSchedule: String,
    estimatedDuration: Number,
    priority: String,
    category: String,
    recurringSchedule: String,
    assignedTo: String,
    additionalWorkers: Array,
    location: String,
    assets: Array,
    created: { 
        type: Date, 
    },
});

module.exports =  mongoose.model('WorkOrder', workOrderSchema);