const express = require('express');
const router = express.Router();
//Importing Models
const Operator = require('../models/operatorModel');
//Importing Libraries
const bcrypt = require("bcryptjs");

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authMiddleware, async (req,res) => {
    try {
        const operatorExist = await Operator.findOne({email: req.body.email});
        if(operatorExist) {
            return res.status(200).send({message: "User already exists", success: false});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newOperator = new Operator(req.body);
        await newOperator.save();
        res.status(200).send({message:"User created successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error creating user", success: false, error});
    }
})

router.get("/get-all-operators", authMiddleware, async( req,res) => {
    try {
        const operators = await Operator.find({});
        res.status(200).send({message:"Operators fetched successfully", success: true, data: operators});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error getting operators", success: false, error});
    }
});

module.exports = router;