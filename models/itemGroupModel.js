const mongoose = require('mongoose');

const itemGroupSchema = new mongoose.Schema({},{strict:false});

const itemGroupModel = new mongoose.model("item group", itemGroupSchema);

module.exports = itemGroupModel;