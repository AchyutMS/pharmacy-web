const mongoose = require('mongoose');

const itemBatchSchema = new mongoose.Schema({},{strict:false});

const itemBatchModel = new mongoose.model("station", itemBatchSchema);

module.exports = itemBatchModel;