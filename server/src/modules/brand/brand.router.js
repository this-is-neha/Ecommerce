// const auth =require("../../middleware/auth.middleware");
// const allowRole=require("../../middleware/rbac.middleware");
// const { setPath, uploader } = require("../../middleware/uploader.middleware");
// const {bodyValidator}=require("../../middleware/validator.middleware");
// const brandCtrl=require("./brand.controller");
// const { BrandCreateDTO,BrandUpdateDTO } = require("./brand.dto")
// const BrandModel = require ("./brand.model")

// const router=require("express").Router()
// router.get('/home-list',brandCtrl.listForHome)
// router.route('/')
// .post(
//     auth,
//     allowRole('admin'),
//     setPath('brands'),
//     uploader.single('image'),
//     bodyValidator(BrandCreateDTO),
//     brandCtrl.create
// )
// .get(
//     auth,
//     allowRole("admin"),
//     brandCtrl.index

// );
// router.route('/:id')
// .get(
//     auth,
//     allowRole('admin'),
//     brandCtrl.show
// )
// .put(
//     auth,
//     allowRole('admin'),
//     setPath('brands'),
//     uploader.single('image'),
//     bodyValidator(BrandUpdateDTO,['image']),
//     brandCtrl.update

// )


// .delete(
//     auth,
//     allowRole('admin'),
//     brandCtrl.delete
// )

// module.exports=router




// brand.routes.js
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const brandCtrl = require("./brand.controller");
const { BrandCreateDTO, BrandUpdateDTO } = require("./brand.dto");
const BrandModel = require("./brand.model");

const router = require("express").Router();

router.get('/home-list', brandCtrl.listForHome);

router.route('/')
  .post(
    auth,
    allowRole('admin'),
    setPath('brands'),
    uploader.single('image'),
    bodyValidator(BrandCreateDTO),
    brandCtrl.create
  )
  .get(
    // auth,
  
    brandCtrl.index 
  );

router.route('/:id')
  .get(
    auth,
    allowRole('admin'),
    brandCtrl.show
  )
  .put(
    auth,
    allowRole('admin'),
    setPath('brands'),
    uploader.single('image'),
    bodyValidator(BrandUpdateDTO, ['image']),
    brandCtrl.update
  )
  .delete(
    auth,
    allowRole('admin'),
    brandCtrl.delete
  );

module.exports = router;
