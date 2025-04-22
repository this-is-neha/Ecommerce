// require("dotenv").config();

// const mongoose=require("mongoose")



// const { MONGO_DB_URL, MONGO_DB_NAME } = process.env;

// mongoose.connect(MONGO_DB_URL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName:MONGO_DB_NAME
   
// }).then(()=>{
//     console.log("Mongo db connnected successfully...")
// })
// .catch((err)=>{
// console.log("Error while connecting Mongodb")
// process.exit(1)
// })



require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_DB_URL, MONGO_DB_NAME } = process.env;

mongoose.connect(MONGO_DB_URL, {
  dbName: MONGO_DB_NAME,
})
  .then(() => {
    console.log("Mongo db connected successfully...");
  })
  .catch((err) => {
    console.log("Error while connecting MongoDB:", err);
    process.exit(1);
  });

