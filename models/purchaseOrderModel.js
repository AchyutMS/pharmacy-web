const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
        supplier: Array,
        item: Array,
        purDetials: Array

},{timestamps:true});

const purchaseOrderModel = new mongoose.model("purchase order", purchaseOrderSchema);

module.exports = purchaseOrderModel;