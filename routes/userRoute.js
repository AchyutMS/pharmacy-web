const express = require('express');
const router = express.Router();
//Importing Models
const User = require('../models/userModel');
//Importing Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async (req,res) => {
    try {
        const userExist = await User.findOne({email: req.body.email});
        if(userExist) {
            return res.status(200).send({message: "User already exists", success: false});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({message:"User created successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error creating user", success: false, error});
    }
})

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(200).send({message:"Invalid email", success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch) {
            return res.status(200).send({message:"Invalid password", success: false});
        } else {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });
            res.status(200).send({message:"Login successful", success: true, token: token});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error logging in", success: false, error});
    }
})

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
    try {
    console.log(req.body)
      const user = await User.findOne({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting user info", success: false, error });
    }
  });

module.exports = router;