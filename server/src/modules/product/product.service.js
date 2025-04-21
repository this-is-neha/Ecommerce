



const ProductModel = require("./product.model");
const slugify = require("slugify");
const mongoose = require("mongoose");

class ProductService {
    uniqueSlug = async (slug) => {
        try {
            const productExists = await ProductModel.findOne({ slug });
            if (productExists) {
                const time = Date.now();
                slug = `${slug}-${time}`;
                return await this.uniqueSlug(slug);
            } else {
                return slug;
            }
        } catch (exception) {
            throw new Error("Error checking slug uniqueness: " + exception.message);
        }
    };

    transformCreateData = async (req) => {
        try {
            const data = { ...req.body };

            if (req.files) {
                data.images = req.files.map(image => image.filename);
            } else {
                data.images = null;
            }

            const slug = slugify(data.title, { lower: true });
            data.slug = await this.uniqueSlug(slug);
            data.afterDiscount = data.price - (data.price * data.discount) / 100;

            data.brand = (data.brand && mongoose.Types.ObjectId.isValid(data.brand)) ? mongoose.Types.ObjectId(data.brand) : null;
            data.sellerId = data.sellerId || null;
            data.categories = data.categories || null;

            data.createdBy = req.authUser._id;

            return data;
        } catch (exception) {
            throw new Error("Error transforming create data: " + exception.message);
        }
    };

    store = async (data) => {
        try {
            const product = new ProductModel(data);
            return await product.save();
        } catch (exception) {
            throw new Error("Error saving product: " + exception.message);
        }
    };

    count = async (filter) => {
        try {
            const countData = await ProductModel.countDocuments(filter);
            return countData
        }
        catch (exception) {
            throw (exception)
        }

    }
   
    listAll = async ({ limit, skip, filter, sort }) => {
        try {
            const response = await ProductModel.find(filter)
                .populate("categoryId", ["_id", "title", "slug"])
                .populate("brandId", ["_id", "title", "slug"])
                .sort(sort)  // This should work as long as sort is formatted correctly
                .limit(limit)
                .skip(skip);
            return response;
        } catch (exception) {
            throw exception;
        }
    };
    
    
    

    findOne = async (filter) => {
        try {

            const data = await ProductModel.findOne(filter)
                .populate("categoryId", ["_id", "title", "slug"])
                .populate("brandId", ["_id", "title", "slug"])
                 .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"])
            if (!data) {
                throw {
                    code: 400,
                    message: "Data not found"
                }

            }
            return data;
        }
        catch (exception) {
            throw exception
        }
    }
    update = async (filter, data) => {
        try {
            const updateResponse = await ProductModel.findOneAndUpdate(filter, { $set: data })
            return updateResponse

        }
        catch (exception) {
            throw (exception)
        }
    }


    deleteOne = async (filter) => {
        try {
            const response = await ProductModel.findOneAndDelete(filter)
            if (!response) {
                throw {
                    code: 404,
                    message: "Product does not exists"
                }
            }
            return response
        }
        catch (exception) {
            throw (exception)
        }
    }

    getForHome = async () => {
        try {
            const data = await ProductModel.find({
                status: "active"
            })
                .populate("categoryId", ["_id", "title", "slug"])
                .populate("brandId", ["_id", "title", "slug"])
                .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"])
                .sort({ _id: "desc" })
                .limit(10)
            return data
        }
        catch (exception) {
            throw (exception)
        }
    }
}
const productSvc = new ProductService()
module.exports = productSvc;
