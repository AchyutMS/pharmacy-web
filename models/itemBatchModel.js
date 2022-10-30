const mongoose = require('mongoose');

const itemBatchSchema = new mongoose.Schema({
        id : String,
        BatchNo: {
            type:String,
        },
        ExpiryDate: {
            type:String,
        },
        CostPrice: {
            type:String,
        },
        Tax: {
            type:String,
        },
        MRP: {
            type: String,
        },
        PTax: {
            type: String,
        },
        StartDate: {
            type: String,
        },
        Quantity: {
            type: String,
            required: true
        },
        CONTAIN: {
            type: String,
        },
        CONTAINSCOST: {
            type: String,
        },
        userid: {
            type: String,
        }

},{strict:false});

const itemBatchModel = new mongoose.model("item batch", itemBatchSchema);

module.exports = itemBatchModel;