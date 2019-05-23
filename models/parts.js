const mongoose = require( 'mongoose' );

const partSchema = mongoose.Schema({     
    partName: String,
    partDescription: String,
    partCategory: String,
    unitCost: Number,
    quantity: Number,
    minimumPartQuantity: Number,
    serialNumber: Number,
    partArea: String,
    additionalDetails: String,
    assignedUsers: Array,
    assignedTeams: Array,
    assignedCustomers: Array,
    location: String,
    updated: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Parts', partSchema);

