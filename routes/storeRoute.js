const express = require("express");
const router = express.Router();
//Importing Models
const ItemGroup = require("../models/itemGroupModel");
const ItemMaster = require("../models/itemMasterModel");
const ItemBatch = require("../models/itemBatchModel");
const station = require("../models/stationModel");
//Importing Libraries
const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-item-group", authMiddleware, async (req, res) => {
  try {
    const itemGroup = await ItemGroup.find({});
    res
      .status(200)
      .send({
        message: "Item Group fetched successfully",
        success: true,
        data: itemGroup,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Item Group", success: false, error });
  }
});

router.get("/get-all-item-details", authMiddleware, async (req, res) => {
  try {
    const itemMaster = await ItemMaster.find().select(['-_id'])
    const itemBatch = await ItemBatch.find().select(['-_id'])
 
    res.status(200).send({message:"Item Master fetched successfully", success: true, data: [itemMaster, itemBatch]});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Item Master", success: false, error });
  }
});

router.post("/get-all-items-from-category", authMiddleware, async (req, res) => {
  try {
    const category = await ItemGroup.findOne({id: req.body.categoryId});
    const items = await ItemMaster.find({categoryid: req.body.categoryId});
    res.status(200).send({message:"Items from Category fetched successfully", success: true, data: [category.name,items]});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Items from Category", success: false, error });
  }
});

//Stock
router.get("/get-all-item-batch", authMiddleware, async (req, res) => {
  try {
    const itemBatch = await ItemBatch.find({});
    res
      .status(200)
      .send({
        message: "Item Batch fetched successfully",
        success: true,
        data: itemBatch,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Item Batch", success: false, error });
  }
});

router.post("/get-all-batch-from-itemId", authMiddleware, async (req, res) => {
  console.log(req.body.itemId)
  try {
    let itemBatch = await ItemBatch.find({id: req.body.itemId});
    const item = await ItemMaster.findOne({id: req.body.itemId});
    itemBatch = itemBatch.sort(function(a, b) {
      var c = new Date(a.ExpiryDate);
      var d = new Date(b.ExpiryDate);
      return c-d;
  });
    res.status(200).send({message:"Batched from Items fetched successfully", success: true, data: [item.name, itemBatch]});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Items from Category", success: false, error });
  }
});

router.get("/get-all-items-quantity", authMiddleware, async (req, res) => {
  try {
    var itemBatch = await ItemBatch.find()

    var itemBatch = itemBatch.sort(function(a, b) {
      var c = parseInt(a.Quantity);
      var d = parseInt(b.Quantity);
      return c-d;
  });

 
    res.status(200).send({message:"Item Batch fetched successfully", success: true, itemBatch});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Item Batch", success: false, error });
  }
});

router.get("/get-all-items-date", authMiddleware, async (req, res) => {
  try {
    var itemBatch = await ItemBatch.find()
    // itemBatch.map(async(item) => {
    //   var medDetail = await ItemMaster.findOne({id: item.id});
    //   item.MedName = (medDetail !== null ? medDetail.name : "")
    // })

    var itemBatch = itemBatch.sort(function(a, b) {
      var c = new Date(a.ExpiryDate);
      var d = new Date(b.ExpiryDate);
      return c-d;
  });
 
    res.status(200).send({message:"Item Batch fetched successfully", success: true, data:itemBatch});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Item Batch", success: false, error });
  }
});

router.get("/get-all-items-master", authMiddleware, async (req, res) => {
  try {
    var itemMaster = await ItemMaster.find()

    res.status(200).send({message:"Item Master fetched successfully", success: true, data : itemMaster});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Item Master", success: false, error });
  }
});


router.post("/get-item-details-from-id", authMiddleware, async (req, res) => {
  console.log("ItemID",req.body.itemId)
  try {
    const item = await ItemMaster.findOne({id: req.body.itemId});
    const batch= await ItemBatch.find({id: req.body.itemId});
    const batchNo = batch.map((ele)=>{
      return ele.BatchNo;
    })
    if(item){
      res.status(200).send({message:"Item fetched successfully", success: true, data: [item,batchNo]});
    } else {
      res.status(200).send({message:"Item ID Not Found", success: false});
    }
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Items from Category", success: false, error });
  }
});

router.post("/save-item", authMiddleware, async (req, res) => {
  try {
    const itemDetails = req.body.itemDetails;
    console.log(itemDetails);
    const item = await ItemMaster.findOne({id: itemDetails.id});
    if(item){
      res.status(200).send({message:"Item already Present", success: false});
    } else {
      const newItem = new ItemMaster(itemDetails);
      await newItem.save();
      res.status(200).send({message:"Item Saved Successfully", success: true});
    }
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Items from Category", success: false, error });
  }
});

router.post("/save-batch", authMiddleware, async (req, res) => {
  try {
    const itemDetails = req.body.itemDetails;
    const batchArray = req.body.batchArray;
    const item = await ItemMaster.findOne({id: itemDetails.id});
    if (item){
      batchArray.map(async (batch)=>{
      const newBatch = new ItemBatch(batch);
      await newBatch.save();
      })
      res.status(200).send({message:"Batch saved successfully", success: true});      
    } else {
      res.status(200).send({message:"Item Not Found", success: false});
    }
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Items from Category", success: false, error });
  }
});


module.exports = router;