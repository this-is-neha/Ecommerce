

// // const { any } = require("joi");
// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;

// // const ProductSchema = new Schema({
// //     title: {
// //         type: String,
// //         required: true,
// //         minlength: 3,
// //     },
// //     slug: {
// //         type: String,
// //         unique: true,
// //         required: true
// //     },
// //     summary: {
// //         type: String,
// //         required: true
// //     },
// //     description: {
// //         type: String,
// //         default: null
// //     },
// //     price: {
// //         type: Number,
// //         min: 100,
// //         required: true
// //     },
// //     discount: {
// //         type: Number,
// //         min: 0,
// //         max: 90,
// //         default: 0
// //     },
// //     afterDiscount: {
// //         type: Number,
// //         min: 0
// //     },
   
// //     categoryId: [{
// //         type: String,
// //         required: true
// //     }],
   
// //     brandId: {
// //         type: String, 
// //         required: true
// //     },
// //     isFeatured: {
// //         type: Boolean,
// //         default: false
// //     },
// //     status: {
// //         type: String,
// //         enum: ['active', 'inactive'],
// //         default: 'inactive'
// //     },
// //     images: [{
// //         type: String,
// //         required: true
// //     }],
    
// //     createdBy: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "User",
// //         default: null
// //     },
// //     updatedBy: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "User",
// //         default: null
// //     }
// // }, {
// //     timestamps: true,
// //     autoCreate: true,
// //     autoIndex: true
// // });

// // const ProductModel = mongoose.model("Product", ProductSchema);
// // module.exports = ProductModel;



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         minlength: 3,
//     },
//     slug: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     summary: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         default: null
//     },
//     price: {
//         type: Number,
//         min: 100,
//         required: true
//     },
//     discount: {
//         type: Number,
//         min: 0,
//         max: 90,
//         default: 0
//     },
//     afterDiscount: {
//         type: Number,
//         min: 0
//     },
  
//     categoryId: [{
//         type: String, 
//         required: true
//     }],
    
//     brandId: {
//         type: String, 
//         required: true
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },
//     status: {
//         type: String,
//         enum: ['active', 'inactive'],
//         default: 'inactive'
//     },
//     image: {
//         type: String,
//         required: true,
//       },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         default: null
//     },
//     updatedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         default: null
//     }
// }, {
//     timestamps: true,
//     autoCreate: true,
//     autoIndex: true
// });

// const ProductModel = mongoose.model("Product", ProductSchema);
// module.exports = ProductModel;




const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        min: 100,
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 90,
        default: 0
    },
    afterDiscount: {
        type: Number,
        min: 0
    },
    // Changing categoryId to an array of strings
    categoryId: [{
        type: String, // Array of strings as per DTO
        required: true
    }],
    // Changing brandId to a string
    brandId: {
        type: String, // Single string as per DTO
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    images:[String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
