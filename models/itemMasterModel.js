const mongoose = require('mongoose');

const itemMasterSchema = new mongoose.Schema({},{strict:false});

const itemMasterModel = new mongoose.model("item master", itemMasterSchema);

module.exports = itemMasterModel;