// const path = require('path'); // Import path module to handle file paths
// const imageUploadSchema = require('./conform.dto'); // Import the Joi validation schema
// const Image = require('./confrom.model'); // Import the Image model
// const { saveImage } = require('./conform.service');
//  const mongoose=require('mongoose')
// class ConformController {
//   async uploadImage(req, res) {
//     try {
//       const { error } = imageUploadSchema.validate({
//         orderId: req.body.orderId,
//       });
  
//       if (error) {
//         return res.status(400).json({
//           data: null,
//           message: error.details[0].message,
//           meta: null,
//         });
//       }
  
//       if (!req.file) {
//         return res.status(400).json({
//           data: null,
//           message: 'No image file uploaded',
//           meta: null,
//         });
//       }
  
//       const newImage = new Image({
//         orderId: req.body.orderId,
//         image: req.file.filename,
//       });
  
//       const savedImage = await newImage.save();
  
//       res.status(201).json({
//         data: {
//           result: {
//             orderId: savedImage.orderId,
//             imageUrl: savedImage.image,
//             id: savedImage._id,
//           },
//         },
//         message: 'Image uploaded successfully!',
//         meta: null,
//       });
//     } catch (err) {
//       console.error('Error while uploading image:', err);
//       res.status(500).json({
//         data: null,
//         message: 'Internal server error',
//         meta: null,
//       });
//     }
//   }
  
//   async getAllImages(req, res) {
//     try {

//       const allImages = await Image.find({}, 'orderId image');

     
//       if (allImages.length === 0) {
//         return res.status(404).json({ message: 'No images found' });
//       }


//       res.status(200).json({ images: allImages });
//     } catch (err) {
//       console.error('Error fetching images:', err);
//       res.status(500).json({ message: 'Error fetching images', error: err.message });
//     }
//   }


  


// async getImageByOrderId(req, res) {
//   try {
//     const { orderId } = req.params;

//     const imageRecord = await Image.findOne({ orderId });

//     console.log("Full Image Record:", JSON.stringify(imageRecord, null, 2));

//     if (!imageRecord) {
//       return res.status(404).json({ message: 'No image found for this orderId' });
//     }

//     console.log("Image Field Content:", imageRecord.image);


//     let images;
//     if (Array.isArray(imageRecord.image)) {
     
//       images = imageRecord.image; 
      
   
//     } else {
//       images = [];
//     }

    
//     console.log("Images Array:", images);

 
//     res.status(200).json({ orderId, images });
//   } catch (err) {
//     console.error('Error fetching image:', err);
//     res.status(500).json({ message: 'Error fetching image', error: err.message });
//   }
// }



const axios = require("axios");
const Order = require("../delivery/delivery.model"); // adjust path if needed

class ConformController {
  async verifyEsewaPayment(req, res) {
    const MERCHANT_ID = "EPAYTEST"; 
    const { amt, refId, pid, name, accountNumber } = req.body;

    console.log("eSewa Callback Data:", req.body);

    try {
      const payload = new URLSearchParams({
        amt,
        rid: refId || "",
        pid,
        scd: MERCHANT_ID,
      }).toString();

      const verifyRes = await axios.post(
        "https://uat.esewa.com.np/epay/transrec",
        payload,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (verifyRes.data.includes("Success")) {
        // Update order with bank info
        await Order.findOneAndUpdate(
          { _id: pid },
          { status: "Paid", refId, buyerName: name, accountNumber, amount: amt }
        );

        return res.redirect("http://localhost:5173/payment/success");
      } else {
        return res.redirect("http://localhost:5173/payment/failure");
      }
    } catch (error) {
      console.error("Payment verification error:", error.message);
      res.status(500).send("Payment verification failed");
    }
  }
}

module.exports = new ConformController();

