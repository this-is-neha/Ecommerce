
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const bannerCtrl = require("./banner.controller");
const { BannerCreateDTO, BannerUpdateDTO } = require("./banner.dto");

const router = require("express").Router();

router.get('/home-list', bannerCtrl.listForHome);

router.route('/')
    .post(
        auth,
        allowRole('admin'),
        setPath('banners'),
        uploader.single('image'),
        bodyValidator(BannerCreateDTO),
        bannerCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        bannerCtrl.index
    );

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        bannerCtrl.show
    )
    .put(
        auth,
        allowRole('admin'),
        setPath('banners'),
        uploader.single('image'),
        bodyValidator(BannerUpdateDTO, ['image']),
        bannerCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        bannerCtrl.delete
    );

module.exports = router;
