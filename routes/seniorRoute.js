const express = require('express')
const router = express.Router()

const RequestItem = require('../models/requestItemModel')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/check-request-item',authMiddleware, async(req,res) => {
    try {
        const reqItem = await RequestItem.find()
        res.status(200).send({message: "Fetch Successfull", success: true, data: reqItem});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error fetching patient", success: false, error});
    }
})

router.post('/delete-item',authMiddleware, async(req,res) => {
    try {
        const id = req.body.id
        await RequestItem.findOneAndDelete({id:id})
        res.status(200).send({message: "Item Deleted Successfull", success: true});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error Deleting Item", success: false, error});
    }
})

module.exports = router;