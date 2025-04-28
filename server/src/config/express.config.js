
// const express = require("express");
// const mongoose=require("mongoose");

// require("./db.config")
// const helmet = require("helmet")
// const cors = require("cors")

// const Joi = require('joi')

// const app = express();
// app.use(helmet())
// app.use(cors())
// const mainRouter = require("./routing.config")

// const router = express.Router()
// app.use(express.json())
// app.use(express.urlencoded({
//     extended: true
// }))
// app.use('/assets', express.static('./public/'))
// router.get('/health', (req, res, next) => {
//     res.json({
//         result: "Hello there",
//         message: "Successs OK",
//         meta: null

//     })
// })
// app.use(router)
// app.use(mainRouter)

// app.use((req, res, next) => {
//     next({
//         code: 404,
//         message: "Resource not found",

//     })


// });
// app.use((error, req, res, next) => {
// console.log(error instanceof mongoose.MongooseError)

// // yo naya wala ho

//     let statusCode = error.code || 500;
//     let data = error.data || null;
//     let msg = error.message || "Internal server error"


//     if (error instanceof Joi.ValidationError) {
//         statusCode = 422,
//             msg = "Validation Failed",
//             data = {};
//         const errorDetail = error.details
//         if (Array.isArray(errorDetail)) {
//             errorDetail.map((errorObj) => {
//                 data[errorObj.context.label] = errorObj.message
//             })
//         }
//     }

// if (+statusCode===11000){
//     statusCode=400
//     data={};
//    const fields =Object.keys (error.keyPattern)
//    fields.map((fieldname)=>{
//     data[fieldname]=fieldname+"should be unique"
//    })
//    msg="Validation Failed"
// }
//     res.status(statusCode).json({
//         result: data,
//         message: msg,
//         meta: null
//     })

// })


// module.exports = app



const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors"); // ✅ Only declared once
const Joi = require("joi");

require("./db.config");
const mainRouter = require("./routing.config");

const app = express();

app.use(helmet());



const allowedOrigins = [
  'https://this-is-neha.netlify.app',
  'http://localhost:5173',
   'http://localhost:5174',
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like curl or postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('./public/'));

app.get("/", (req, res) => {
  res.json({
    message: "Complaint Register backend is live 🚀",
  });
});

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.json({
    result: "Hello there",
    message: "Success OK",
    meta: null,
  });
});

console.log("This is Neha");

app.use(mainRouter);

// ❌ 404 Handler
app.use((req, res, next) => {
  next({
    code: 404,
    message: "Resource not found",
  });
});

// 🚨 Global Error Handler
app.use((error, req, res, next) => {
  console.log("Mongoose error:", error instanceof mongoose.MongooseError);

  let statusCode = error.code || 500;
  let data = error.data || null;
  let msg = error.message || "Internal server error";

  if (error instanceof Joi.ValidationError) {
    statusCode = 422;
    msg = "Validation Failed";
    data = {};
    const errorDetail = error.details;
    if (Array.isArray(errorDetail)) {
      errorDetail.forEach((errorObj) => {
        data[errorObj.context.label] = errorObj.message;
      });
    }
  }

  if (+statusCode === 11000) {
    statusCode = 400;
    data = {};
    const fields = Object.keys(error.keyPattern);
    fields.forEach((fieldname) => {
      data[fieldname] = `${fieldname} should be unique`;
    });
    msg = "Validation Failed";
  }

  res.status(statusCode).json({
    result: data,
    message: msg,
    meta: null,
  });
});

module.exports = app;
