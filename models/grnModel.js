const mongoose = require('mongoose')
const GRNSchema = new mongoose.Schema({
    poNumber:Number,
    supplierName: String,
    supplierAddress:String,
    invoiceNumber: Number,
    invoiceDate: String,
    deliveryDate:String,
    GRNNumber: Number,
    GRNType: String,
    operator: Array,
    GRNItem: Array,
})

const GRNModel = new mongoose.model('grn', GRNSchema)
module.exports = GRNModel