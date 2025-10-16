const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
 orderId:{
  type:String,
  required:true
 },
 image:[String],
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
