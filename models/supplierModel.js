const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
    {   
        Name: {
            type:String,
            required: true
        },
        oAddress: {
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