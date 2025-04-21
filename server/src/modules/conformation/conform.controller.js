const path = require('path'); // Import path module to handle file paths
const imageUploadSchema = require('./conform.dto'); // Import the Joi validation schema
const Image = require('./confrom.model'); // Import the Image model
const { saveImage } = require('./conform.service');
 const mongoose=require('mongoose')
class ConformController {



  async uploadImage(req, res) {
    try {
      const { error } = imageUploadSchema.validate({
        orderId: req.body.orderId,
      });
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
      }
  
      const imageUrl = `${req.file.filename}`;
  
      const newImage = new Image({
        orderId: req.body.orderId,
        image: req.file.filename,
      });
  
      const savedImage = await newImage.save();
  
    
      res.status(201).json({
        message: 'Image uploaded successfully!',
        orderId: savedImage.orderId,
        imageUrl: savedImage.image,
        id: savedImage._id, 
      });
    } catch (err) {
      console.error('Error while uploading image:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  async getAllImages(req, res) {
    try {

      const allImages = await Image.find({}, 'orderId image');

     
      if (allImages.length === 0) {
        return res.status(404).json({ message: 'No images found' });
      }


      res.status(200).json({ images: allImages });
    } catch (err) {
      console.error('Error fetching images:', err);
      res.status(500).json({ message: 'Error fetching images', error: err.message });
    }
  }


  


async getImageByOrderId(req, res) {
  try {
    const { orderId } = req.params;

    const imageRecord = await Image.findOne({ orderId });

    console.log("Full Image Record:", JSON.stringify(imageRecord, null, 2));

    if (!imageRecord) {
      return res.status(404).json({ message: 'No image found for this orderId' });
    }

    console.log("Image Field Content:", imageRecord.image);


    let images;
    if (Array.isArray(imageRecord.image)) {
     
      images = imageRecord.image; 
      
   
    } else {
      images = [];
    }

    
    console.log("Images Array:", images);

 
    res.status(200).json({ orderId, images });
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).json({ message: 'Error fetching image', error: err.message });
  }
}



}




module.exports = new ConformController();
