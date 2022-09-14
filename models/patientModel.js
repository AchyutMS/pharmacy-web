const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {   
        UID : String,
        name: {
            type:String,
            required: true
        },
        phoneNumber: {
            type:String,
        },
        age: {
            type:Number,
            required: true
        },
        sex: {
            type:String,
            required: true
        },
        records : {
            prescriptions: {
                type: Array,
            }
        }
    },
    {
        timestamps: true,
    }
)

const patientModel = new mongoose.model("patients", patientSchema);

module.exports = patientModel;