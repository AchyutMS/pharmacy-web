const express = require('express');
const router = express.Router();
//Importing Models
const itemBatchModel = require('../models/itemBatchModel')
const Patient = require('../models/patientModel');
//Importing Libraries
const {v4: uuidv4} = require('uuid');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register-patient', authMiddleware, async (req,res) => {
    try {
        const patientExist = await Patient.findOne({phoneNumber: req.body.phoneNumber});
        if(patientExist) {
            return res.status(200).send({message: "Patient already exists in database", success: false});
        }
        const UID = uuidv4().slice(0,8);
        req.body.UID = UID;

        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(200).send({message:"Patient created successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error saving patient Data", success: false, error});
    }
})

router.post('/get-patient-info-by-phone-number', authMiddleware, async (req, res) => {
    try {
        const patient = await Patient.findOne({phoneNumber: req.body.phoneNumber});
        if(patient){
            res.status(200).send({message: "Patient details fetched successfully", success: true, data: patient});
        }
        else {
            res.status(200).send({message: "No Records Found", success: false});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error fetching patient", success: false, error});
    }
})

router.post('/generate-bill', authMiddleware, async (req, res) => {
    try {
        const { patient, sub_patient, bill_details, prescription } = req.body;
        const update_patient = await Patient.findOne({_id: patient._id});
        const update_prescription = update_patient.records.prescriptions;
        update_prescription.push({patient:sub_patient, billDetails:bill_details, prescription});
        await update_patient.save();

        prescription.map(async(pres) => {
            const batch = await itemBatchModel.findOne({BatchNo : pres.BatchNo})
            batch.Quantity = parseInt(batch.Quantity) - pres.required_quantity
            console.log(batch.Quantity)
            await batch.save()

            // itemBatchModel.members[index].name = new_name;
            // batch.markModified('item batch');
            // await batch.save();

            // itemBatchModel.updateOne({BatchNo : pres.BatchNo}, { $set: {Quantity: parseInt(Quantity) - pres.required_quantity}})
             
        })

        res.status(200).send({ message: "Bill Generated successfully", success: true, data: patient});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error generating bill", success: false, error});
    }
})


router.post('/update-bill', authMiddleware, async (req, res) => {
    console.log('in')
    try {
        const prescription = req.body.prescription
        prescription.map(async(pres) => {
            const batch = await itemBatchModel.findOne({BatchNo : pres.BatchNo})
            batch.Quantity = parseInt(batch.Quantity) + pres.returnQty
            console.log(batch.Quantity)
            await batch.save()
        })

        res.status(200).send({ message: "Bill updated successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error Updating bill", success: false, error});
    }
})

router.get('/get-prescription-detail/:userId/:prescriptionId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const prescriptionId = req.params.prescriptionId;

        const patient = await Patient.findOne({_id: userId})
        const response = patient.records.prescriptions[prescriptionId]
        // console.log(response)
        res.status(200).send({ message: "Prescription details Fetched successfully", success: true, data: response});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error getting precription details", success: false, error});
    }
})


module.exports = router;