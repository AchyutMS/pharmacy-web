const express = require("express");
const router = express.Router();
//Importing Models
const ItemGroup = require("../models/itemGroupModel");
const ItemMaster = require("../models/itemMasterModel");
const ItemBatch = require("../models/itemBatchModel");
const station = require("../models/stationModel");
const RequestItem = require("../models/requestItemModel");
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

router.post('/request-item',async (req,res) => {
  const id = req.body.id
  // console.log(item)
  
  try {
    const item = await ItemMaster.findOne({id: id}).select(['-_id'])
    
    const reqItem = new RequestItem({
      id: item.id,
      name: item.name,
      sellingprice : item.sellingprice,
      startdatetime : item.startdatetime,
      enddatetime : item.enddatetime,
      name1 : item.name1,
      strength : item.strength,
      categoryid : item.categoryid,
      manufacturerid : item.manufacturerid,
      Deleted : item.Deleted,
      manufacturercode : item.manufacturercode,
      EUB : item.EUB,
      profitcenter : item.profitcenter,
      sunitid : item.sunitid,
      tax : item.tax,
      schedule : item.schedule,
      mrpitem : item.mrpitem,
      conversionqty : item.conversionqty,
      drugtype : item.drugtype,
      itemcode : item.itemcode,
      itemcheckcomplete : item.itemcheckcomplete,
      itemcheckincomplete : item.itemcheckincomplete,
      deletedby : item.deletedby,
      unitid : item.unitid,
      type : item.type,
      narcotics : item.narcotics,
      cssditem : item.cssditem,
      consignment : item.consignment,
      approval : item.approval,
      reusableitem : item.reusableitem,
      reusablecount : item.reusablecount,
      tempcatid : item.tempcatid,
      modifieddate : item.modifieddate,
      DiscountEligible : item.DiscountEligible,
      OperatorId : item.OperatorId,
      blocked : item.blocked,
      Claiming : item.Claiming,
      CommodityCode : item.CommodityCode,
      PurchasePrice : item.PurchasePrice,
      S_TAX : item.S_TAX,
      hsncode : item.hsncode,
      CGST : item.CGST,
      SGST : item.SGST,
      IGST : item.IGST,
      specialisationid : item.specialisationid,
      pers_itemid : item.pers_itemid,
      pers_categoryid : item.pers_categoryid,
      pers_manufacturerid : item.pers_manufacturerid,
    })
  
    await reqItem.save()

    res
    .status(200)
    .send({ message: "Requested Successfully", success: true });
  } catch (err) {
    res
    .status(500)
    .send({ message: "Request Failed", success: false, err });
  }
})


module.exports = router;