const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
        poNumber: Number,
        supplier: Object,
        item: Array,
        purDetails: Object,
        poTotal: Number,
        isApproved: Boolean,
},{timestamps:true});

const purchaseOrderModel = new mongoose.model("purchase order", purchaseOrderSchema);

module.exports = purchaseOrderModel;