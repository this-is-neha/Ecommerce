const brandSvc = require("./brand.service");
class BrandContoller {
    create = async (req, res, next) => {
        try {
            const payload = brandSvc.transformCreateData(req);
            const createdBrand = await brandSvc.store(payload)
            res.json({
                result: createdBrand,
                message: "Brand created successfully",
                meta: null

            })
        }
        catch (exception) {
            next(exception)
        }
    }
    index = async (req, res, next) => {
        try {


            const page = +req.query.page || 1;
            const limit = req.query.limit || 15
            const skip = (page - 1) * limit;

            let filter = {};
            if (req.query.search) {
                filter = {
                    title: new RegExp(req.query.search, 'i')


                }
            }

            const data = await brandSvc.listAll({
                limit: limit,
                skip: skip
            });
            const countData = await brandSvc.count({
                filter: filter
            })

            res.json({
                result: data,
                message: "Brand list",
                meta: {
                    limit: limit,
                    page: page,
                    total: countData
                }
            })
        }
        catch (exception) {
            next(exception)
        }
    }
    show = async (req, res, next) => {
        try {
            const detail = await brandSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result: detail,
                message: "brand detail fetched",
                meta: null
            })
        }

        catch (exception) {
            next(exception)

        }
    }
    update = async (req, res, next) => {
        try {
            const existingData = brandSvc.findOne({
                _id: req.params.id
            })
            const payload = brandSvc.transformUpdateData(req, existingData);
            const updateStatus = await brandSvc.update({ _id: req.params.id }, payload);
            console.log("Brand")
            res.json({
                result: updateStatus,
                message: "Data updated",
                meta: null

            })
        }
        catch (exception) {
            next(exception)

        }

    }

    delete = async (req, res, next) => {
        try {
            const exists = await brandSvc.findOne({ _id: req.params.id })
            const status = await brandSvc.deleteOne({ _id: req.params.id });
            res.json({
                result: status,
                messgae: "Brand deleted successfully",
                meta: null
            })

        }
        catch (exception) {
            next(exception)
        }
    }
    listForHome = async (req, res, next) => {
        try {
            const list = await brandSvc.getForHome()
            res.json({
                result: list,
                message: "Banner listed successfully",
                meta: null

            })
        }
        catch (exception) {

        }
    }
}
const brandCtrl = new BrandContoller()
module.exports = brandCtrl