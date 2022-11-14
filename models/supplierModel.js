const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
    {   
        name: {
            type:String,
            required: true
        },
        address: {
            type:String,
            required: true
        },
        items : {
            type:Array,
        }
    },
    {
        timestamps: true,
    }
)

const supplierModel = new mongoose.model("supplier", supplierSchema);

module.exports = supplierModel;