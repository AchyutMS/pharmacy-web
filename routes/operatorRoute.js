const express = require('express');
const router = express.Router();
//Importing Models
const Operator = require('../models/operatorModel');
//Importing Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/login', async (req,res) => {
    try {
        const operator = await Operator.findOne({email: req.body.email});
        if(!operator) {
            return res.status(200).send({message:"Invalid email", success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password,operator.password);
        if(!isMatch) {
            return res.status(200).send({message:"Invalid password", success: false});
        } else {
            const token = jwt.sign({id:operator._id}, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });
            res.status(200).send({message:"Login successful", success: true, token: token});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error logging in", success: false, error});
    }
})

router.post("/get-operator-info-by-id", authMiddleware, async (req, res) => {
    try {
      const operator = await Operator.findOne({ _id: req.body.operatorId });
      operator.password = undefined;
      if (!operator) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: operator,
        });
      }
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .send({ message: "Error getting user info", success: false, error });
    }
});

router.post('/update-operator-profile', authMiddleware, async (req,res) => {
  try {
      console.log('before updation',req.body)
      const operatorOldInfo = await Operator.findOne({_id: req.body.operatorId});
      console.log(operatorOldInfo)

      if(req.body.user.name){
        operatorOldInfo.name = req.body.user.name;
      } 

      if(req.body.user.email){
        operatorOldInfo.email = req.body.user.email ;
      } 

      if(req.body.user.phoneNumber){
        operatorOldInfo.phoneNumber = req.body.user.phoneNumber;
      } 

      if(req.body.user.password) {  
        const password = req.body.user.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        operatorOldInfo.password = hashedPassword;    
      } 
       
      await operatorOldInfo.save();
      res.status(200).send({message:"User created successfully", success: true});
  } catch (error) {
      console.log(error);
      res.status(500).send({message:"Error creating user", success: false, error});
  }
})

module.exports = router;