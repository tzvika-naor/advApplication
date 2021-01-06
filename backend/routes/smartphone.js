const express = require('express');
const router = express.Router();
const SmartphoneController = require('../controllers/smartphone');


router.get("", SmartphoneController.getSmartphones); //all Smartphone
router.get("/:id",SmartphoneController.getSmartphone); // single Smartphone
router.post("", SmartphoneController.createSmartphone); // add a new Smartphone to the database
router.put("/:id", SmartphoneController.updateSmartphone); //update an existing Smartphone
router.delete("/:id", SmartphoneController.deleteSmartphone);

module.exports = router;