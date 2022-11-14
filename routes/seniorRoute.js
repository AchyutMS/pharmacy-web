const express = require('express')
const router = express.Router()

const RequestItem = require('../models/requestItemModel');
const Supplier = require('../models/supplierModel');
const authMiddleware = require('../middlewares/authMiddleware');

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

module.exports = router;