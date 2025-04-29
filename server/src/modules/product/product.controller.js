const productSvc = require("./product.service");
const Product = require('./product.model'); // Ensure you have a Product model
const ProductModel= require('./product.model')

const mongoose = require("mongoose");
class ProductController {
    create = async (req, res, next) => {
        try {
            console.log("Received payload:", req.body);
            const payload = await productSvc.transformCreateData(req);
            console.log("Transformed payload:", payload); // Add this line to check transformed data
    
            const createdProduct = await productSvc.store(payload);
            console.log("Neha")
            console.log("Created product:", createdProduct); // Log the created product
            console.log("Returning success response for created product");
            return res.status(201).json({
                result: createdProduct,
                message: "Product created successfully",
                meta: null,
            });
        } catch (error) {
            console.error("Error creating product:", error); // Detailed error logging
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    };
    


    // index = async (req, res, next) => {
    //     try {
    //         const page = +req.query.page || 1;
    //         const limit = +req.query.limit || 15;
    //         const skip = (page - 1) * limit;
    
    //         let filter = {};
    
    //         if (req.query.search) {
    //             filter.title = new RegExp(req.query.search, 'i');
    //         }
    
    //         if (req.query.categoryId) {
    //             filter.categoryId = req.query.categoryId;
    //         }
    
    //         if (req.query.brandId) {
    //             filter.brandId = req.query.brandId;
    //         }
    
    //         // Determine sort order
    //         let sort = {};
    //         if (req.query.sort === "priceAsc") {
    //             sort.price = 1; // Ascending
    //         } else if (req.query.sort === "priceDesc") {
    //             sort.price = -1; // Descending
    //         }
    
            
    //         const data = await productSvc.listAll({ limit, skip, filter, sort });
    //         console.log('Fetched data:', data); // This logs the fetched products data
            
    //         const countData = await productSvc.count({ filter });
    //         console.log('Count data:', countData); // This logs the count of products
            
    //         // res.json({
    //         //   result: data, // This will be the array of product data from listAll()
    //         //   message: "Product list", // A simple message
    //         //   meta: {
    //         //     limit, // Limit for pagination
    //         //     page, // Current page
    //         //     total: countData, // Total count of products
    //         //   },
    //         // });
    //            res.json({
    //         data: {
    //             result: data, // Array of products
    //             message: "Product list", // Message
    //             meta: {
    //                 limit, // Limit for pagination
    //                 page, // Current page
    //                 total: countData, // Total count of products
    //             }
    //         }
    //     });
    //     } catch (exception) {
    //         console.error("Error fetching product list:", exception);
    //         return res.status(500).json({ 
    //             error: "Failed to fetch products", 
    //             details: exception.message 
    //         });
    //     }
    // };
    
    index = async (req, res, next) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;
            const skip = (page - 1) * limit;
    
            let filter = {};
    
            if (req.query.search) {
                filter.title = new RegExp(req.query.search, 'i');
            }
    
            if (req.query.categoryId) {
                filter.categoryId = req.query.categoryId;
            }
    
            if (req.query.brandId) {
                filter.brandId = req.query.brandId;
            }
    
            // Determine sort order
            let sort = {};
            if (req.query.sort === "priceAsc") {
                sort.price = 1; // Ascending
            } else if (req.query.sort === "priceDesc") {
                sort.price = -1; // Descending
            }
    
            const data = await productSvc.listAll({ limit, skip, filter, sort });
            console.log('Fetched data:', data); // This logs the fetched products data
            
            const countData = await productSvc.count({ filter });
            console.log('Count data:', countData); // This logs the count of products
            
            // Wrap the result in a `data` object
            res.json({
                data: {
                    result: data, // Array of products
                    message: "Product list", // Message
                    meta: {
                        limit, // Limit for pagination
                        page, // Current page
                        total: countData, // Total count of products
                    }
                }
            });
        } catch (exception) {
            console.error("Error fetching product list:", exception);
            return res.status(500).json({
                error: "Failed to fetch products",
                details: exception.message
            });
        }
    };
    


    show = async (req, res, next) => {
        try {
            const detail = await productSvc.findOne({ _id: req.params.id });
            if (!detail) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({
                data: {
                    result: detail,
                },
                message: "Product detail fetched",
                meta: null,
            });
            
        } catch (exception) {
            console.error("Error fetching product detail:", exception); // Log the exception
            return res.status(500).json({ 
                error: "Failed to fetch product", 
                details: exception.message 
            });
        }

     
    };

    update = async (req, res, next) => {
        try {
            const existingData = await productSvc.findOne({ _id: req.params.id });
            if (!existingData) {
                return res.status(404).json({ message: "Product not found" });
            }

            const payload = await productSvc.transformCreateData(req, existingData);
            const updateStatus = await productSvc.update({ _id: req.params.id }, payload);
            res.json({
                result: updateStatus,
                message: "Product updated successfully",
                meta: null,
            });
        } catch (exception) {
            console.error("Error updating product:", exception); 
            return res.status(500).json({ 
                error: "Failed to update product", 
                details: exception.message 
            });
        }
    };

    delete = async (req, res, next) => {
        try {
            const existingProduct = await productSvc.findOne({ _id: req.params.id });
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            const status = await productSvc.deleteOne({ _id: req.params.id });
            res.json({
                result: status,
                message: "Product deleted successfully",
                meta: null,
            });
        } catch (exception) {
            console.error("Error deleting product:", exception); 
            return res.status(500).json({ 
                error: "Failed to delete product", 
                details: exception.message 
            });
        }
    };

    checkSlugExists = async (req, res) => {
        const { slug } = req.query;
        
        try {
            const product = await Product.findOne({ slug });
            if (product) {
                return res.status(200).json({ exists: true });
            }
            return res.status(200).json({ exists: false });
        } catch (error) {
            console.error("Error checking slug:", error);
            return res.status(500).json({ message: "Server error" });
        }
    };

    listForHome = async (req, res, next) => {
        try {
            const list = await productSvc.getForHome();
            res.json({
                result: list,
                message: "Products listed for home page successfully",
                meta: null,
            });
        } catch (exception) {
            console.error("Error fetching products for home:", exception); // Log the exception
            return res.status(500).json({ 
                error: "Failed to fetch products for home", 
                details: exception.message 
            });
        }
    };
}

const productCtrl = new ProductController();
module.exports = productCtrl;
