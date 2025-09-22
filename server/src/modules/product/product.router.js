
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { ProductCreateDTO, ProductUpdateDTO } = require("./product.dto");
const productCtrl = require("./product.controller");
const ProductModel = require("./product.model"); 


router.get('/check-slug', async (req, res, next) => {
    try {
        const { slug } = req.query;
        const exists = await ProductModel.findOne({ slug });
        res.status(200).json({ exists: !!exists });
    } catch (error) {
        next(error);
    }
});

router.get('/home-list', productCtrl.listForHome);

router.route('/')
    .post(
        auth,
        allowRole('admin'),
        setPath('product'),
        uploader.array('images'),
        bodyValidator(ProductCreateDTO),
        productCtrl.create
    )
    .get(
        auth,
        
        productCtrl.index
    );

router.route('/:id')
    .get(
        auth,
    
        productCtrl.show
    )
    .put(
        auth,
        allowRole('admin'),
        setPath('product'),
        uploader.array('images'),
        bodyValidator(ProductUpdateDTO),
        productCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        productCtrl.delete
    );

module.exports = router;
