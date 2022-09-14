const express = require('express');
const router = express.Router();
//Importing Models
const ItemGroup = require('../models/itemGroupModel');
const ItemMaster = require('../models/itemMasterModel');
//Importing Libraries
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');



router.get("/get-all-item-group", authMiddleware, async (req,res) => {
    try {
        const itemGroup = await ItemGroup.find({});
        res.status(200).send({message:"Item Group fetched successfully", success: true, data: itemGroup});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error getting Item Group", success: false, error});
    }
});

router.get("/get-all-item-master", authMiddleware, async (req,res) => {
    try {
        const itemMaster = await ItemMaster.find({});
        res.status(200).send({message:"Item Master fetched successfully", success: true, data: itemMaster});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error getting Item Master", success: false, error});
    }
});

module.exports = router;