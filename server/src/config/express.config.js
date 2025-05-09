// const express = require("express");
// const mongoose = require("mongoose");
// const helmet = require("helmet");
// const cors = require("cors");
// const Joi = require("joi");

// require("./db.config");
// const mainRouter = require("./routing.config");

// const app = express();

// app.use(helmet());

// const corsOptions = {
//   origin: ['https://this-is-nehaa.netlify.app', 'http://localhost:5173'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add more methods if necessary
//   credentials: true, // Allow credentials if needed
// };


// app.use('/uploads', express.static('public/uploads', {
//   setHeaders: (res, path) => {
//     // res.setHeader('Access-Control-Allow-Origin', 'https://this-is-nehaa.netlify.app'); // Use the frontend URL
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   }
// }));


// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//   res.json({
//     message: "Complaint Register backend is live 🚀",
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     result: "Hello there",
//     message: "Success OK",
//     meta: null,
//   });
// });

// app.use(mainRouter);

// // 404 Handler
// app.use((req, res, next) => {
//   next({
//     code: 404,
//     message: "Resource not found",
//   });
// });

// // Global Error Handler
// app.use((error, req, res, next) => {
//   console.log("Mongoose error:", error instanceof mongoose.MongooseError);

//   let statusCode = error.code || 500;
//   let data = error.data || null;
//   let msg = error.message || "Internal server error";

//   if (error instanceof Joi.ValidationError) {
//     statusCode = 422;
//     msg = "Validation Failed";
//     data = {};
//     const errorDetail = error.details;
//     if (Array.isArray(errorDetail)) {
//       errorDetail.forEach((errorObj) => {
//         data[errorObj.context.label] = errorObj.message;
//       });
//     }
//   }

//   if (+statusCode === 11000) {
//     statusCode = 400;
//     data = {};
//     const fields = Object.keys(error.keyPattern);
//     fields.forEach((fieldname) => {
//       data[fieldname] = `${fieldname} should be unique`;
//     });
//     msg = "Validation Failed";
//   }

//   res.status(statusCode).json({
//     result: data,
//     message: msg,
//     meta: null,
//   });
// });

// module.exports = app;
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const Joi = require("joi");

require("./db.config");
const mainRouter = require("./routing.config");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['https://this-is-nehaa.netlify.app', 'http://localhost:5173'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if needed
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Helmet for basic security
app.use(helmet());

// Static file serving for uploads
app.use('/uploads', express.static('public/uploads', {
  setHeaders: (res, path, stat) => {
    const allowedOrigins = ['https://this-is-nehaa.netlify.app', 'http://localhost:5173'];
    const origin = res.req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Complaint Register backend is live 🚀",
  });
});

app.get("/health", (req, res) => {
  res.json({
    result: "Hello there",
    message: "Success OK",
    meta: null,
  });
});

app.use(mainRouter);

// 404 Handler
app.use((req, res, next) => {
  next({
    code: 404,
    message: "Resource not found",
  });
});

// Global Error Handler
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
