const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 2,
        unique:true

    },
    slug:{
        type:String,
        unique:true
    },
    link: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    homeSection:Boolean,
    image: {

        type:String,
        required:true
},
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }


},
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true
    }
)





const BrandModel = mongoose.model("Brand", BrandSchema)


module.exports = BrandModel;

