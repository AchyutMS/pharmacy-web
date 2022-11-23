const express = require('express')
const router = express.Router()

const RequestItem = require('../models/requestItemModel');
const Supplier = require('../models/supplierModel');
const authMiddleware = require('../middlewares/authMiddleware');
const PurchaseOrder = require("../models/purchaseOrderModel");

router.get('/check-request-item',authMiddleware, async(req,res) => {
    try {
        const reqItem = await RequestItem.find()
        res.status(200).send({message: "Items Fetched Successfull", success: true, data: reqItem});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error fetching Items", success: false, error});
    }
})

router.post('/delete-item',authMiddleware, async(req,res) => {
    try {
        const id = req.body.id
        await RequestItem.findOneAndDelete({id:id})
        res.status(200).send({message: "Item Marked Requested", success: true});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Cannot Mark Item as Requested", success: false, error});
    }
})

router.post('/add-new-supplier',authMiddleware, async(req,res) => {
    try {
        const supplier = req.body.supplier;
        const newSupplier = new Supplier(req.body);
        await newSupplier.save();
        res.status(200).send({message:"Supplier Added successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error saving Supplier Data", success: false, error});
    }
})

router.get("/get-all-suppliers", authMiddleware, async (req, res) => {
    try {
      var suppliers = await Supplier.find()
      res.status(200).send({message:"Suppliers fetched successfully", success: true, data : suppliers});
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error getting Suppliers", success: false, error });
    }
  });

router.post("/save-supplier", authMiddleware, async (req, res) => {
    try {
      const {supplier, MapItem } = req.body
      var suppliers = await Supplier.findById(supplier._id)
      console.log(suppliers)

      suppliers.items = MapItem
      await suppliers.save()
        
      res.status(200).send({message:"Suppliers Updated Successfully", success: true});
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Updating Suppliers", success: false, error });
    }
  });

router.post("/purchase-order-approval", authMiddleware, async (req, res) => {
    try {
      const poId = req.body.id;
      const approval = req.body.approval;
      if(approval){
        const newPoDetails = await PurchaseOrder.findOne({_id: poId});
        newPoDetails.isApproved = approval;
        await newPoDetails.save()
          
        res.status(200).send({message:"Purchase Order Approval Successful", success: true});

      } else {
        await PurchaseOrder.findOneAndDelete({_id:poId});
        res.status(200).send({message: "Purchase Order Request Rejected", success: false});
      }

    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Purchase Order Approval Failed", success: false, error });
    }
  });


module.exports = router;