const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const operatorSchema = new mongoose.Schema(
    {   
        OID : Number,
        name: {
            type:String,
            required: true
        },
        phoneNumber: {
            type:String,
        },
        email: {
            type:String,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        role: {
            type: String,
            default: "salesman",
        },
        
    },
    {
        timestamps: true,
    }
)

operatorSchema.plugin(autoIncrement, {inc_field: 'OID'});
const operatorModel = new mongoose.model("operators", operatorSchema);

module.exports = operatorModel;