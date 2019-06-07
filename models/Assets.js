const mongoose = require( 'mongoose' );

const assetSchema = mongoose.Schema({     
    assetName: String,
    description: String,
    model: String,
    serialNumber: String,
    assetCategory: String,
    location: String,
    area: String,
    parentAsset: String,
    parts: [{}],
    primaryUser: String,
    assignedUsers: Array,
    assignedTeams: Array,
    assignedCustomers: Array,
    active: { type: String, default: "active" },
    updated: { type: Date, default: Date.now }

});

module.exports =  mongoose.model('Assets', assetSchema);

