const mongoose = require("mongoose")
const AddressSchema = new mongoose.Schema({
    houseNo: String,
    streetName: String,
    ruralDev: String,
    district: String,
    province: String
})
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true

    },
    role: {
        type: String,
        enum: ['seller', 'customer', 'admin'],
        default: "customer"
    },
    activationToken: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    phone: String,
    image: String,
    address: {
        shippingAddress: AddressSchema,
        billingAddress: AddressSchema

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





const UserModel = mongoose.model("User", UserSchema

)
module.exports = UserModel;
