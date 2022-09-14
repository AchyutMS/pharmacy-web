const mongoose = require('mongoose');

const itemBatchSchema = new mongoose.Schema({},{strict:false});

const itemBatchModel = new mongoose.model("item batch", itemBatchSchema);

module.exports = itemBatchModel;