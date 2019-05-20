const mongoose = require( 'mongoose' );

const assetSchema = mongoose.Schema({     
    assetName: String,
    description: String,
    model: String,
    barcode: String,
    assetCategory: String,
    location: String,
    area: String,
    parentAsset: String,
    primaryUser: String,
    assignedUsers: Array,
    assignedTeams: Array,
    assignedCustomers: Array,
    selectLocation: String,
    created: { 
        type: Date, 
    },
});

module.exports =  mongoose.model('Assets', assetSchema);