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
      console.log(req.body.state)
      // const operatorExist = await Operator.findOne({email: req.body.email});
      // if(operatorExist) {
      //     return res.status(200).send({message: "User already exists", success: false});
      // }
      // const password = req.body.password;
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      // req.body.password = hashedPassword;

      // const newOperator = new Operator(req.body);
      // await newOperator.save();
      res.status(200).send({message:"User created successfully", success: true});
  } catch (error) {
      console.log(error);
      res.status(500).send({message:"Error creating user", success: false, error});
  }
})

module.exports = router;