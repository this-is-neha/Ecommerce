
const express = require('express');
const router = express.Router();
//const {setPath,uploader}=require("../../middleware/uploader.middleware") // This should be correct now
const conformCtrl = require('./conform.controller'); // Import the controller

// Route for uploading an image
//router.post('/', uploader.single('image'), conformCtrl.uploadImage);
// router.post('/',setPath(''),uploader.single('image'), conformCtrl.uploadImage)
// router.get('/:orderId', conformCtrl.getImageByOrderId);

// router.get('/', conformCtrl.getAllImages); //
router.post('/pay',conformCtrl.verifyEsewaPayment);
module.exports = router;