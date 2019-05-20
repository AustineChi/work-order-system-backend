const mongoose = require( 'mongoose' );

const partSchema = mongoose.Schema({     
    partName: String,
    partDescription: String,
    partCategory: String,
    unitCost: Number,
    quantity: Number,
    minimumPartQuantity: Number,
    barcode: Number,
    partArea: String,
    additionalDetails: String,
    assignedUsers: Array,
    assignedTeams: Array,
    assignedCustomers: Array,
    selectLocation: String,
    created: { 
        type: Date, 
    },
});

module.exports =  mongoose.model('Parts', partSchema);

